import React from 'react'
import { Link } from 'react-router-dom'
import { useState, useEffect } from "react";
import axios from "axios";
import jwtDecode from "jwt-decode";
import Sidebar from "./Sidebar";
import EventModal from "./Modal/EventModal";

const Dashboard = ({ currentUser, userEvents, attendingEvents, pendingInvites }) => {
  const userObj = () => {
    return jwtDecode(localStorage.getItem("user"));
  }

  const baseUrl = process.env.NODE_ENV === "production" ? "http://convogo.herokuapp.com" : "http://localhost:5000" 

  const eventPackage = () => {
    return userEvents.concat(attendingEvents)
  }

  //#region Event CRUD
  const createEvent = (title) => {
    const obj = jwtDecode(localStorage.getItem("user"))
    const newEvent = {
      activities: [],
      discussion: [],
      editors: [],
      owner: obj["sub"],
      title: title,
      itinerary: []
    };

    const addOwner = {
      googleId: obj["sub"],
      name: obj["name"] + " (Organizer)",
      email: obj["email"],
      picture: obj["picture"]
    }
    newEvent["editors"].push(addOwner);

    axios.post(`${baseUrl}/events/add`, newEvent).then(res => {
      currentUser["oEventsInProgress"].push(res.data);
      axios.post(`${baseUrl}/users/update/` + jwtDecode(localStorage.getItem("user"))["sub"], currentUser).then(res => {
        window.location = '/';
      });
    });
  }

  const deleteEvent = (id) => {
    axios.delete(`${baseUrl}/events/${id}`).then(res => {
      currentUser["oEventsInProgress"] = currentUser["oEventsInProgress"].filter(item => item !== id)
      axios.post(`${baseUrl}/users/update/${currentUser["googleId"]}`, currentUser).then(res => {
        window.location = '/';
      });
    });
  }

  const leaveEvent = (eventId) => {
    currentUser["pEventsInProgress"] = currentUser["pEventsInProgress"].filter(item => item !== eventId)
    axios.post(`${baseUrl}/users/update/${currentUser["googleId"]}`, currentUser).then(res => {
      axios.get(`${baseUrl}/events/${eventId}`).then(res => {
        var receivedEvent = res.data;
        receivedEvent["editors"] = receivedEvent["editors"].filter(i=> i.googleId !== currentUser["googleId"])
        axios.post(`${baseUrl}/events/update/${eventId}`, receivedEvent).then(() => {
          window.location = '/';
        })
      });
    });
  }

  const joinEvent = (eventId, inviteId) => {
    const obj = jwtDecode(localStorage.getItem("user"));
    const newMember = {
      googleId: obj["sub"],
      name: obj["name"],
      email: obj["email"],
      picture: obj["picture"],
    }
    axios.get(`${baseUrl}/events/${eventId}`).then(res => {
      var receivedEvent = res.data;
      receivedEvent["editors"].push(newMember)
      axios.post(`${baseUrl}/events/update/${eventId}`, receivedEvent).then(() => {
        axios.delete(`${baseUrl}/invitations/${inviteId}`);

        axios.get(`${baseUrl}/users/` + obj["sub"]).then(resTwo => {
          var updatedUser = resTwo.data;

          updatedUser["pEventsInProgress"].push(eventId)
          console.log(updatedUser)
          axios.post(`${baseUrl}/users/update/` + obj["sub"], updatedUser).then(update => {
            console.log(update.data)
            window.location = '/'
          })
        })
      })
    });
  }
  
  const declineEvent = (inviteId) => {
    axios.delete(`${baseUrl}/invitations/${inviteId}`).then(window.location = '/')
  }
  //#endregion

  return (
    <div className="drawer drawer-mobile">
      <Sidebar userObject={userObj()} eventPackages={userEvents.concat(attendingEvents)}/>
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        <div className="dashview divide-x flex items-start">

          {/* MY EVENTS */}
          <div className="overflow-auto mx-2 min-h-screen max-h-screen relative">
            <h1 className="heading">My Events</h1>
            {userEvents.map((event) => (
              <div className="dayTitle">
                <Link className={"whiteFont"} style={{ textDecoration: 'none' }} to={`/event/${event._id}`}>{event.title}</Link>
                <button className='btn btn-xs btn-outline btn-error float-right' onClick={() => deleteEvent(event._id)}>Delete</button>
              </div>
            ))}
            <EventModal createEvent={createEvent} />
          </div>

           {/* ATTENDING */}
          <div className="overflow-auto mx-2 min-h-screen max-h-screen">
            <h1 className="heading">Attending </h1>
            {attendingEvents.map((event) => (
              <div className="dayTitle">
                <Link className={"whiteFont"} style={{ textDecoration: 'none' }} to={`/event/${event._id}`}>{event.title}</Link>
                <button className='btn btn-xs btn-outline btn-error float-right' onClick={() => leaveEvent(event._id, null, null)}>Leave</button>
              </div>
            ))}
          </div>

          {/* PENDING INVITES */}
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