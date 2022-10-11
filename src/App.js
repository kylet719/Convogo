import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Event from "./components/Event";
import Dashboard from "./components/Dashboard";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import jwtDecode from "jwt-decode";
import Login from "./components/Login";
import UserProfile from "./components/UserProfile";

function App() {
  const [userEvents, setEventItems] = useState()
  const [finishedLoading, setLoaded] = useState(false)
  const [loggedIn, setLogIn] = useState(UserProfile.getLogStatus)

  const handleCallbackResponse = (response) => {
    console.log("Encoded JWT ID token: " + response.credential);
    const obj = jwtDecode(response.credential);
    console.log(obj);
    localStorage.setItem('user', response.credential);
    setLogIn(true);
  }

  useEffect(() => {
    const jwt = localStorage.getItem("user");
    if (!jwt) {

      /*global google*/
    google.accounts.id.initialize({
      client_id: "950362977131-f9spgsmvsbpelq3mrf3mp7um6ejbfgc9.apps.googleusercontent.com",
      callback: handleCallbackResponse
    });

    google.accounts.id.renderButton(
      document.getElementById("signInDiv"),
      {theme: "outline", size: "large"}
    );

    }
    else {
      setLogIn(true);
    }
    

    const getEvents = async () => {
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

  const handleSignOut = () => {
    console.log("remove")
    localStorage.removeItem("user");
    window.location = '/';

  }

  return (
    <DndProvider backend={HTML5Backend}>
      <Router>
        <div className="">
          <h1 className="text-3xl font-bold"><Link to='/' className={"titleCard"} style={{ textDecoration: 'none' }}>CONVOGO</Link></h1>
          {/* <div id="signInDiv"></div> */}
          <Routes>
            <Route path='/' element={<>{ loggedIn ? (finishedLoading ? (<Dashboard userEvents={userEvents} signout = {handleSignOut} />) : ("Loading")): (<Login/>) }</>} />
            <Route path='/event/:id' element={<Event />} />
          </Routes>
          <footer></footer>
        </div>
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