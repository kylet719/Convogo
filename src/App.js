import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Event from "./components/Event";
import Dashboard from "./components/Dashboard";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import jwtDecode from "jwt-decode";
import Login from "./components/Login";
import axios from "axios";

function App() {
  const [loggedIn, setLogIn] = useState(false)
  const [eventsLoaded, setEventsLoaded] = useState(false)
  //This user is our own userSchema
  const [currentUser, setUser] = useState()
  const [pendingInvites, setInvites] = useState([])
  //Events owned and ongoing
  const [eventItemsOO, setEventItemsOO] = useState([])
  //Events attending and ongoing
  const [eventItemsAO, setEventItemsAO] = useState([])

  useEffect(() => {
    /*global google*/
    const jwt = localStorage.getItem("user");

    if (!jwt) {
      // Cache doesn't have log in session so show log in button
      google.accounts.id.initialize({
        client_id: "950362977131-f9spgsmvsbpelq3mrf3mp7um6ejbfgc9.apps.googleusercontent.com",
        callback: handleSignIn
      });
      google.accounts.id.renderButton(
        document.getElementById("signInDiv"),
        {theme: "outline", size: "large"}
      );
    } else {
      // Cache does have log in session, get user data again then get relevant events (COULD BE BETTER)
      const obj = jwtDecode(localStorage.getItem("user"))
      axios.get('http://localhost:5000/users/' + obj["sub"]).then(res => {
        setUser(res.data)
        setLogIn(true);
        const batchRequest = {
          ids: res.data["oEventsInProgress"]
        }
        axios.post('http://localhost:5000/events/batch', batchRequest).then(resTwo => {
          setEventItemsOO(resTwo.data);
          const batchAttending = {
            ids: res.data["pEventsInProgress"]
          }
          axios.post('http://localhost:5000/events/batch', batchAttending).then(resThree => {
            setEventItemsAO(resThree.data);
            setEventsLoaded(true);
            


          })
        })

        const getInvites = {
          email: obj["email"]
        }
        axios.post('http://localhost:5000/invitations/batch', getInvites).then(res => {
          setInvites(res.data);
        })

      });
    }
  }, [])

  //#region Sign-in sign-out
  const handleSignIn = (response) => {
    const obj = jwtDecode(response.credential);
    console.log(obj["sub"])
    axios.get('http://localhost:5000/users/' + obj["sub"]).then(res => {
      if (!res.data) {
        // Response was null, user has never logged in so make an entry in DB
        const newUser = {
          oEventsInProgress: [],
          oEventsDone: [],
          pEventsInProgress: [],
          pEventsDone: [],
          name: obj["name"],
          googleId: obj["sub"]
        }
        axios.post('http://localhost:5000/users/add', newUser).then(res => {
          setUser(newUser)
        });
      } else {
        // Response not null, retrieve user data from DB
          setUser(res.data)
          const batchRequest = {
            ids: res.data["oEventsInProgress"]
          }
          axios.post('http://localhost:5000/events/batch', batchRequest).then(r => {
            setEventItemsOO(r.data);
            const batchAttending = {
              ids: res.data["pEventsInProgress"]
            }
            axios.post('http://localhost:5000/events/batch', batchAttending).then(resTwo => {
              setEventItemsAO(resTwo.data);
              setEventsLoaded(true);
            })
          })

          const getInvites = {
            email: obj["email"]
          }
          axios.post('http://localhost:5000/invitations/batch', getInvites).then(res => {
            setInvites(res.data);
          })
      }
    });
    localStorage.setItem('user', response.credential);
    setEventsLoaded(true);
    setLogIn(true);
  }

  const handleSignOut = () => {
    localStorage.removeItem("user");
    window.location = '/';
  }
  //#endregion

  return (
    <DndProvider backend={HTML5Backend}>
      <Router>
        <div className="">
          {/* {!loggedIn && !eventsLoaded ? "": <Sidebar userObject = {currentUser}/>} */}
          <h1 className="text-3xl font-bold"><Link to='/' className={"titleCard"} style={{ textDecoration: 'none' }}>CONVOGO</Link></h1>
          {/* <div id="signInDiv"></div> */}
          <Routes>
            <Route path='/' element={<>{ loggedIn ? (eventsLoaded ? (<><Dashboard currentUser= {currentUser} userEvents={eventItemsOO} attendingEvents = {eventItemsAO} pendingInvites = {pendingInvites}/></>) : ("Loading")): (<Login/>) }</>} />
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