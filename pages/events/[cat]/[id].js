import Image from "next/image";
import { useRouter } from "next/router";
import { useRef, useState } from "react";

const Event = ({data}) => {
  const inputEmail = useRef();
  const router = useRouter();
  const [message, setMessage] = useState();

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    const email = inputEmail.current.value;
    const eventId = router.query.id;

    const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if (!email.match(validRegex)) {
      setMessage('Please introduce a correct email address');
    }

    try {
      const response = await fetch("/api/email-registration", {
        method: "POST", 
        headers: {
          "Content-Type": "application/json",
        }, 
        body: JSON.stringify({email, eventId})
      })

      if(response.ok) {
        const data = await response.json();
        setMessage(data.message);
        inputEmail.current.value = "";
      } else if (response.status == 409){
        const data = await response.json();
        setMessage(data.message)
      } else {
        throw new Error (`Error: ${response.status}`)
      }
    } catch (e) {
      console.log("error", e)
    }
  }

  return(
    <div className="single-event">
      <h1 className="title">{data.title}</h1>
      <Image src={data.image} alt={data.id} width={600} height={400} className="image"/>
      <p className="desc">{data.description}</p>
      <form className="input-field" onSubmit={handleSubmitForm}>
        <label htmlFor="">Registered Your Email</label>
        <input type="email" placeholder="john@gmail.com" ref={inputEmail} />
        <button type="submit">Submit</button>
      </form>
      <p>{message}</p>
    </div>
  )
};

export default Event;

export async function getStaticPaths() {
  const {allEvents} = await import("/data/data.json");
  const paths = allEvents.map(event => ({
    params: {
      cat: event.city,
      id: event.id
    }
  }))

  return {
    paths,
    fallback: false, 
  }
}

export async function getStaticProps(context) {
  const eventNow = context.params.id;
  const {allEvents} = await import('/data/data.json');

  const data = allEvents.find(event => event.id === eventNow)
  return {
    props: { data: data },
  }
}