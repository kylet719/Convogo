import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Activities from "./Activities";
import DateAdd from "./Modal/DateModal";
import ActivityAdd from "./Modal/ActivityModal";
import ItineraryItem from "./ItineraryItem";
import Chat from "./Chat";
import Activity from "./Activities";


const Event = () => {
    const [eventItems, setEventItems] = useState("")
    const [status, setComplete] = useState(false)
    const params = useParams()
  
    //#region database calls
    useEffect( () => {
      const getEvents = async() => {
        const taskFromServer = await fetchEvent()
        setEventItems(taskFromServer)
        
      }
      getEvents()
      
    }, [])
  
    const fetchEvent = async (id) => {
      const res = await fetch(`http://localhost:5000/events/${params.id}`)
      const data = await res.json()
      setComplete(true)
      return data
    }
    
    const deleteDay = (dayString) => {
      // Removes linkage between a deleted day and its activities
      const indexOfDeleteDay = eventItems["itinerary"].findIndex(item => new Date(item.date).toString() === dayString)
      eventItems["itinerary"][indexOfDeleteDay]["activityids"].forEach(id => {
      const indexOfLinkedDay = eventItems["activities"].findIndex(item => item._id === id)
      eventItems["activities"][indexOfLinkedDay]["date"] = null
      })
    
      const filteredItinerary = eventItems["itinerary"].filter(item => new Date(item.date).toString() !== dayString)
      const updatedEvent = {
        activities: eventItems.activities,
        discussion: eventItems.discussion,
        editors: eventItems.editors,
        owner: eventItems.owner,
        title: eventItems.title,
        itinerary: filteredItinerary
      };
      console.log(updatedEvent)
      axios.post('http://localhost:5000/events/update/'+params.id, updatedEvent).then(res => console.log(res.data));
      window.location = '/event/'+params.id;
    }

  

    const deleteActivity = (activity, index) => {
      console.log(activity);
      console.log(index);
      const date = eventItems["activities"][index].date;
      console.log("activity date: " + date);
      var flag = (date != null);
      var newItinerary;
      if (flag) {
        // Removes linkage between a deleted day and its activities
        const indexOfDeleteDay = eventItems["itinerary"].findIndex(item => new Date(item.date).toString() == new Date(date).toString())
        const test = eventItems["itinerary"].forEach(item => console.log("itinieray dates: " + new Date(item.date).toString()))

        console.log(eventItems)
        console.log("INDES" + indexOfDeleteDay)
      
        
        
        const filteredActivities = eventItems["itinerary"][indexOfDeleteDay]["activityids"].filter(item => item != activity)

        const day = eventItems["itinerary"][indexOfDeleteDay];
        const updatedday = {
          date: day.date,
          activityids: filteredActivities,
        }
        console.log(updatedday);

        // filter out the old day
        const filteredItinerary = eventItems["itinerary"].filter((item, index) => index !== indexOfDeleteDay);
        console.log(filteredItinerary);

        newItinerary = addToItinerary(filteredItinerary, updatedday);
      
        console.log(newItinerary);

     }
      
      console.log("delete" + activity)
      const filteredActivities = eventItems["activities"].filter(item => item._id !== activity)
      const updatedEvent = {
        activities: filteredActivities,
        discussion: eventItems.discussion,
        editors: eventItems.editors,
        owner: eventItems.owner,
        title: eventItems.title,
        itinerary: flag ? newItinerary : eventItems.itinerary
      };
      console.log(updatedEvent)
      axios.post('http://localhost:5000/events/update/'+params.id, updatedEvent).then(res => console.log(res.data));
      window.location = '/event/'+params.id;

    }
  
    //#endregion
  
    //#region Drag and Drop stuff

    /**
     * Passed down into itineraryitem to enable drag and drop
     * @param {id of the dragged Activity in string} id 
     * @param {date of the itinerary day in string} date 
     */
    const dndActivity2Day = (id, date) => {
      // Links the activity to the day
      const dateIndex = eventItems["itinerary"].findIndex(item => new Date(item.date).toString() === date)
      const activityIndex = eventItems["activities"].findIndex(item => item._id === id)

      console.log(eventItems["activities"][activityIndex]["date"])

      // You can only drop into day if the day isn't already in there + day isn't associate with a day already
      console.log("Attempting to put " + eventItems["activities"][activityIndex]["title"] + " to " + eventItems["itinerary"][dateIndex]["date"])
      if (!eventItems["itinerary"][dateIndex]["activityids"].includes(id) && eventItems["activities"][activityIndex]["date"] === null ) {
        //Links activity to the day
        eventItems["itinerary"][dateIndex]["activityids"].push(id)
        //Links the day to the activity
        eventItems["activities"][activityIndex]["date"] = new Date(date).toString()

        const updatedEvent = {
          activities: eventItems.activities,
          discussion: eventItems.discussion,
          editors: eventItems.editors,
          owner: eventItems.owner,
          title: eventItems.title,
          itinerary: eventItems.itinerary
        };

        axios.post('http://localhost:5000/events/update/'+params.id, updatedEvent).then(res => console.log(res.data));
        setEventItems(updatedEvent)
      }
    };

    const moveItem = (dragIndex, hoverIndex) => {
      const item = eventItems["activities"][dragIndex];
      const newActivities = eventItems["activities"].filter((i, idx) => idx !== dragIndex);
      newActivities.splice(hoverIndex, 0, item);
      const updatedEvent = {
        activities: newActivities,
        discussion: eventItems.discussion,
        editors: eventItems.editors,
        owner: eventItems.owner,
        title: eventItems.title,
        itinerary: eventItems.itinerary
      };

      if (newActivities.length === eventItems["activities"].length) {
        console.log(newActivities)
        axios.post('http://localhost:5000/events/update/'+params.id, updatedEvent).then(res => console.log(res.data));
        
      }
      setEventItems(updatedEvent)
  };
  //#endregion

    function addToItinerary(itinerary, day) {
      if (itinerary == 0) {
        eventItems.itinerary.push(day)
      } else {
        for (var i = 0; i < itinerary.length; i++) {
          if (new Date(day.date.toString()) - new Date(itinerary[i]["date"]) < 0 ) {
            break;
          }
        }
        itinerary.splice(i, 0, day)
      }
      return itinerary;
    }

    // Can probably move back into the DateModal
    const dateModalSubmit = (newDate) => {
      console.log(new Date(newDate))
      console.log(Date.parse(newDate))
      const newItineraryItem = {
        date: new Date(newDate.toString()),
        activityids: []
      };
      const newItinerary = addToItinerary(eventItems.itinerary, newItineraryItem);

      const updatedEvent = {
        activities: eventItems.activities,
        discussion: eventItems.discussion,
        editors: eventItems.editors,
        owner: eventItems.owner,
        title: eventItems.title,
        itinerary: newItinerary,
      };

      console.log(updatedEvent)

      axios.post('http://localhost:5000/events/update/'+params.id, updatedEvent).then(res => console.log(res.data));
      setEventItems(updatedEvent)
      window.location = '/event/'+params.id;
    }

    // Can probably move back into the ActivityModal
    const activityModalSubmit = (activity) => {
      console.log(activity)
      console.log(Date.parse(activity.date))
      

      eventItems.activities.push(activity);

      
      const updatedEvent = {
        activities: eventItems.activities,
        discussion: eventItems.discussion,
        editors: eventItems.editors,
        owner: eventItems.owner,
        title: eventItems.title,
        itinerary: eventItems.itinerary,
      };

      console.log(updatedEvent)

      axios.post('http://localhost:5000/events/update/'+params.id, updatedEvent).then(res => console.log(res.data));
      setEventItems(updatedEvent)
      window.location = '/event/'+params.id;

    }    

    const refresh = () => {
    }
  
  
    return (
      <>
        {status ? 
        (
        <> 
        <h1>{eventItems["title"]}</h1>
        <div className="eventview">
            
          <div className = "Activites">
            <h1>Activities</h1>
            <Activities activities = {eventItems["activities"]} 
                                      moveItem={moveItem} 
                                      deleteFunction ={deleteActivity}  
                                      refresh ={refresh}/>
            <ActivityAdd param = {eventItems["_id"]} submitButton = {activityModalSubmit}/>
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
            <DateAdd param = {eventItems["_id"]} submitButton = {dateModalSubmit}/>
          </div>
    
          <div className = "Discussion">
            <h1>Discussion</h1>
            <Chat />
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