import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import DatePicker from 'react-datepicker';
import Activities from "./Activities";
import Modal from "./Modal/DateModal";
import ItineraryItem from "./ItineraryItem";


const Event = () => {
    const [eventItems, setEventItems] = useState()
    const [status, setComplete] = useState(false)
    const params = useParams()
  
    //#region database calls
    useEffect( () => {
      const getEvents = async() => {
        const taskFromServer = await fetchData()
        setEventItems(taskFromServer.filter(event => event._id === params.id)[0])
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
      const filteredItinerary = eventItems["itinerary"].filter(item => item.date !== dayString)
      const updatedEvent = {
        activities: eventItems.activities,
        discussion: eventItems.discussion,
        editors: eventItems.editors,
        owner: eventItems.owner,
        title: eventItems.title,
        itinerary: filteredItinerary
      };
      axios.post('http://localhost:5000/events/update/'+params.id, updatedEvent).then(res => console.log(res.data));
      setEventItems(updatedEvent)
      // window.location = '/event/'+params.id;
      // console.log(eventItems);
    }
  
    //#endregion

  
    /**
     * Passed down into itineraryitem to enable drag and drop
     * @param {id of the dragged Activity in string} id 
     * @param {date of the itinerary day in string} date 
     */
    const dndActivity2Day = (id, date) => {
      // Links the activity to the day
      const dateIndex = eventItems["itinerary"].findIndex(item => item.date === date)
      const activityIndex = eventItems["activities"].findIndex(item => item._id === id)

      if (!eventItems["itinerary"][dateIndex]["activityids"].includes(id)) {
        //Links activity to the day
        eventItems["itinerary"][dateIndex]["activityids"].push(id)
        //Links the day to the activity
        eventItems["activities"][activityIndex]["date"] = date

        axios.post('http://localhost:5000/events/update/'+params.id, eventItems).then(res => console.log(res.data));
        setEventItems(eventItems)

      }


      
    };
  
  
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
            <button onClick = {() => console.log(eventItems)}>LOGGER</button>
          </div>
    
          <div className = "itinerary">
            <h1>Itinerary</h1>
            <>
            {eventItems["itinerary"].map((day) => (
              <div > 
              <ItineraryItem date = {day.date} 
                            activities = {day.activityids} 
                            deleteFunction = {deleteDay} 
                            dropFunction = {dndActivity2Day}
                            fullActivityList = {eventItems["activities"]}/>
              </div>
            ))}
            </>
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