const path = require("path");
const fs = require("fs");

const buildPath = () => {
  return path.join(process.cwd(), "data", "data.json")
}

const extractData = (filePath) => {
  const jsonData = fs.readFileSync(filePath, "utf8");
  const data = JSON.parse(jsonData);
  return data;
}

export default function handler(req, res) {
  const {method} = req;
  const {email, eventId} = req.body

  const filePath = buildPath();
  const {events_categories, allEvents} = extractData(filePath);
  
  if(!allEvents) {
    res.status(404).json({
      message: "Data not found",
      status: 404,
    })
  }

  if(method === "POST") {
    if (!email | !email.includes('@')) {
      res.status(422).json({ message: 'Invalid email address' });
    }

    const newAllEvents = allEvents.map(event => {
      if(event.id == eventId) {
        if(event.emails_registered == email) {
          res.status(409).json({
            message: "Email has been already registered"
          })
          return event
        }
        return{
          ...event,
          emails_registered: [
            ...event.emails_registered,
            email
          ]
        };
      } return event
    })

    fs.writeFileSync(filePath, JSON.stringify({ events_categories, allEvents: newAllEvents }));
    
    res.status(200).json({message: `Successfully registered ${email} ${eventId}`})
  }
}