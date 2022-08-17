import { useState, useEffect } from "react";
import Itinerary from "./components/Itinerary";
import Activities from "./components/Activities";
import Modal from "./components/Modal/DateModal";
import axios from "axios";
import DatePicker from 'react-datepicker';
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Event from "./components/Event";
import Dashboard from "./components/Dashboard";

function App() {
  const [userEvents, setEventItems] = useState()
  const [finishedLoading, setLoaded] = useState(false)

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
    setLoaded(true)
    return data
  }

  const fetchEvent = async (id) => {
    const res = await fetch(`http://localhost:5000/eventss/${id}`)
    const data = await res.json()
    return data
  }

  

  const deleteDay = (dayString) => {
    const filteredItinerary = userEvents[0]["itinerary"].filter(item => item.date != dayString)
    const updatedEvent = {
      activities: userEvents[0].activities,
      discussion: userEvents[0].discussion,
      editors: userEvents[0].editors,
      owner: userEvents[0].owner,
      title: userEvents[0].title,
      itinerary: filteredItinerary
    };
    axios.post('http://localhost:5000/events/update/'+userEvents[0]["_id"], updatedEvent).then(res => console.log(res.data));
    window.location = '/';
    console.log(userEvents);
  }

  //#region Drag and Drop

//   const onDrop = (item, monitor, status) => {
//     const mapping = statuses.find(si => si.status === status);

//     setEventItems(prevState => {
//         const newItems = prevState
//             .filter(i => i.id !== item.id)
//             .concat({ ...item, status, icon: mapping.icon });
//         return [ ...newItems ];
//     });
//   };

// const moveItem = (dragIndex, hoverIndex) => {
//     const item = userEvents[0]["activities"][dragIndex];
    
//     setEventItems(prevState => {
//         const newItems = prevState.filter((idx) => idx !== dragIndex);
//         newItems.splice(hoverIndex, 0, item);
//         return  [ ...newItems ];
//     });
//   };

  //#endregion


  return (
    <Router>
    <>
    <h1><Link to='/' className = {"titleCard"} style={{ textDecoration: 'none' }}>CONVOGO</Link></h1>
      <Routes>
          <Route path = '/' element = {<>{finishedLoading? (<Dashboard userEvents = {userEvents}/>):("Loading")}</>} />
          <Route path = '/event/:id' element= {<Event/>} />
        </Routes>
    </>
    </Router>
    
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