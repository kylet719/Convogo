import React from 'react'
import { Link } from 'react-router-dom'
import { useState, useEffect } from "react";
import axios from "axios";
import jwtDecode from "jwt-decode";
import Sidebar from "./Sidebar";


const Dashboard = ({userEvents, attendingEvents, signout, newEvent, deleteEvent, pendingInvites}) => {
  const [tempEvent, setEventName] = useState("")

  const userObj = () => {
    return jwtDecode(localStorage.getItem("user"));  
  }

  const joinEvent = (eventId, inviteId) => {
    const obj = jwtDecode(localStorage.getItem("user"));
    const newMember = {
      googleId: obj["sub"],
      name: obj["name"],
      email: obj["email"],
      picture: obj["picture"],
    }
    axios.get(`http://localhost:5000/events/${eventId}`).then(res => {
        var receivedEvent = res.data;
        receivedEvent["editors"].push(newMember)
        axios.post(`http://localhost:5000/events/update/${eventId}`, receivedEvent).then(() => {
          axios.delete(`http://localhost:5000/invitations/${inviteId}`);

          axios.get('http://localhost:5000/users/' + obj["sub"]).then(resTwo=> {
            var updatedUser = resTwo.data;
            
            updatedUser["pEventsInProgress"].push(eventId)
            console.log(updatedUser)
            axios.post('http://localhost:5000/users/update/' + obj["sub"], updatedUser).then( update => {
              console.log(update.data)
              window.location ='/'
            })
          })
        })
      });
  }

  const declineEvent = (inviteId) => {
    axios.delete(`http://localhost:5000/invitations/${inviteId}`).then(window.location = '/')
  }

  return (
    <div className="drawer drawer-mobile">
      <Sidebar userObject={userObj()}/>
              <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
      <div className="eventview divide-x flex items-start">

        <div className="overflow-auto mx-2 min-h-screen max-h-screen relative">
          <h1 className="heading">My Events</h1>
          {userEvents.map((event) => (
            <div className="dayTitle">
              <Link className={"whiteFont"} style={{ textDecoration: 'none' }} to={`/event/${event._id}`}>{event.title}</Link>
              <button className='btn btn-xs btn-outline btn-error float-right' onClick={() => deleteEvent(event._id, null, null)}>Delete</button>
            </div>
          ))}
          <button onClick={() => newEvent(tempEvent)}>ADD EVENT</button>
          <input className="g-gray-200 appearance-none border-2 border-gray-200 rounded py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" type="text" value={tempEvent} onChange={(e) => setEventName(e.target.value)}></input>
        </div>

        <div className="overflow-auto mx-2 min-h-screen max-h-screen">
          <h1 className="heading">Attending </h1>
          {attendingEvents.map((event) => (
            <div className="dayTitle">
              <Link className={"whiteFont"} style={{ textDecoration: 'none' }} to={`/event/${event._id}`}>{event.title}</Link>
              <button className='btn btn-xs btn-outline btn-error float-right' onClick={() => deleteEvent(event._id, null, null)}>Leave</button>
            </div>
          ))}
        </div>

        <div className="overflow-auto mx-2 min-h-screen max-h-screen">
          <h1 className="heading">Pending Invites</h1>
          {pendingInvites.map((invite) => (
            <div className="dayTitle">
              <p>{invite.senderName} wants you to join their event, {invite.eventTitle}!</p>
              <p>{invite.note ? `"${invite.note}"` : ""}</p>
              <button className='btn my-1 btn-xs btn-outline btn-accent' onClick={() => joinEvent(invite.eventId, invite._id)}>Join</button>
              <button className='btn btn-xs btn-outline btn-error' onClick={() => declineEvent(invite._id)}>Decline</button>
            </div>
          ))}
        </div>

        </div>






      </div>
    </div>
  )
}

export default Dashboard