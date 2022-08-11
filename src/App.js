import { useState, useEffect } from "react";
import Itinerary from "./components/Itinerary";
import Activities from "./components/Activities";
import Modal from "./components/Modal/DateModal";
import axios from "axios";
import DatePicker from 'react-datepicker';

function App() {
  const [eventItems, setEventItems] = useState()
  const [status, setComplete] = useState(false)

  useEffect( () => {
    const getEvents = async() => {
      const taskFromServer = await fetchData()
      setEventItems(taskFromServer)
    }

    getEvents()
  }, [])

  const fetchData = async () => {
    const res = await fetch('http://localhost:5000/events')
    const data = await res.json()
    setComplete(true)
    return data
  }

  const fetchEvent = async (id) => {
    const res = await fetch(`http://localhost:5000/eventss/${id}`)
    const data = await res.json()
    return data
  }

  const deleteDay = (dayString) => {
    const filteredItinerary = eventItems[0]["itinerary"].filter(item => item.date != dayString)

    const updatedEvent = {
      activities: eventItems[0].activities,
      discussion: eventItems[0].discussion,
      editors: eventItems[0].editors,
      owner: eventItems[0].owner,
      title: eventItems[0].title,
      itinerary: filteredItinerary
    };

    axios.post('http://localhost:5000/events/update/'+eventItems[0]["_id"], updatedEvent).then(res => console.log(res.data));

    
      window.location = '/';

    console.log(eventItems);
  }


  return (
    <>
      {status ? 
      (
      <div className="container">

      <div className = "Activites">
        <h1>Activities</h1>
        <Activities activities = {eventItems[0]["activities"]}/>
        <button onClick = {() => console.log(eventItems[0]["_id"])}> +</button>
      </div>

      <div className = "itinerary">
        <h1>Itinerary</h1>
        <Itinerary dayList = {eventItems[0]["itinerary"]} deleteFunction = {deleteDay} />
        <Modal param = {eventItems[0]["_id"]}>

        <DatePicker />


        </Modal>
        
      </div>

      <div className = "Discussion">
        <h1>Discussion</h1>
      </div>

      <div className = "Members">
        <h1>Members</h1>
      </div>
    </div>
    )
      :
      (<h1>LOADING</h1>)}
    </>
    
  );
}

export default App;

// TODO:
// Add pop up for date and change to something parsible
// Add pop up for creating a new activity
// Update activity to auto increment an id for easy retrival 
// Connect it to the itinerary activity items

// Nav bar
// Figure out how to implement chat discussion
// Implement login functionality
// Implement drag and drop