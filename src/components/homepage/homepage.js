import Link from 'next/link';
import Image from 'next/image';

const homepage = ({data}) => {
  return (
    <div className='home-body'>
      {
        data.map(event => (
          <Link href={`/events/${event.id}`} key={event.id} className="card">
            <Image src={event.image} alt={event.title} width={550} height={350} className="card-image"/>
            <div className='card-content'>
              <h2>{event.title}</h2>
              <p>{event.description}</p>
            </div>
          </Link>
        ))
      }
    </div>
  )
}

export default homepage;