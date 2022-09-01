import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Event from "./components/Event";
import Dashboard from "./components/Dashboard";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

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

  return (
    <DndProvider backend={HTML5Backend}>
    <Router>
    <>
      <h1><Link to='/' className = {"titleCard"} style={{ textDecoration: 'none' }}>CONVOGO</Link></h1>
      <Routes>
          <Route path = '/' element = {<>{finishedLoading? (<Dashboard userEvents = {userEvents}/>):("Loading")}</>} />
          <Route path = '/event/:id' element= {<Event/>} />
      </Routes>
      <footer></footer>
    </>
    </Router>
    </DndProvider>
  );
}

export default App;

// TODO:
// Add pop up for creating a new activity
// Maybe connect the activities to a date through the date id?
// Nav bar
// Figure out how to implement chat discussion
// Implement login functionality
// Implement drag and drop (Fix the ordering system)

// localhost:5000 for database
// localhost:5001 for socket.io
// localhost:3000 for web app