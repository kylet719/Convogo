import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import DatePicker from 'react-datepicker';
import Activities from "./Activities";
import Itinerary from "./Itinerary";
import Modal from "./Modal/DateModal";

const Event = () => {
    const [eventItems, setEventItems] = useState()
    const [status, setComplete] = useState(false)

    const params = useParams()
  
    useEffect( () => {
      const getEvents = async() => {
        const taskFromServer = await fetchData()
        setEventItems(taskFromServer.filter(event => event._id == params.id)[0])
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
      const filteredItinerary = eventItems["itinerary"].filter(item => item.date != dayString)
      const updatedEvent = {
        activities: eventItems.activities,
        discussion: eventItems.discussion,
        editors: eventItems.editors,
        owner: eventItems.owner,
        title: eventItems.title,
        itinerary: filteredItinerary
      };
      axios.post('http://localhost:5000/events/update/'+params.id, updatedEvent).then(res => console.log(res.data));
      window.location = '/event/'+params.id;
      console.log(eventItems);
    }

  
  
    return (
      <>
        {status ? 
        (
          <> 
          <h1>{eventItems.title}</h1>
        <div className="container">
            
  
        <div className = "Activites">
          <h1>Activities</h1>
          <Activities activities = {eventItems["activities"]}/>
          <button onClick = {() => console.log(eventItems["itinerary"])}> +</button>
        </div>
  
        <div className = "itinerary">
          <h1>Itinerary</h1>
          <Itinerary dayList = {eventItems["itinerary"]} deleteFunction = {deleteDay} />
          <Modal param = {eventItems["_id"]}>
  
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
      </>
      )
        :
        (<h1>LOADING</h1>)}
      </>
      
    );
}


export default Event