import React from 'react'
import { Link } from 'react-router-dom'
import { useState, useEffect } from "react";

const Dashboard = ({userEvents, signout, newEvent, deleteEvent}) => {
  const [tempEvent, setEventName] = useState("")

  return (
    <div>
      <h1>MY EVENTS</h1>
        {userEvents.map((event) => (
          <div className="dayTitle"> 
          <Link className = {"whiteFont"} style={{ textDecoration: 'none' }} to={`/event/${event._id}`}>{event.title}</Link>
          <button className='btn btn-xs btn-outline btn-error float-right' onClick = {() => deleteEvent(event._id, null, null)}>Delete</button>
          </div>
    ))}
    <button onClick = {() => newEvent(tempEvent)}>ADD EVENT</button>
    <input type="text" value = {tempEvent} onChange ={(e) => setEventName(e.target.value)}></input>
    <button onClick= {() => signout()}>Sign out</button>
    </div>
  )
}

export default Dashboard