import React from 'react'
import { Link } from 'react-router-dom'

const Dashboard = ({userEvents, signout}) => {
  return (
    <div>
      <h1>MY EVENTS</h1>
        {userEvents.map((event) => (
          <div className="dayTitle"> 
          <Link className = {"whiteFont"} style={{ textDecoration: 'none' }} to={`/event/${event._id}`}>{event.title}</Link>
          </div>
    ))}
    <button onClick= {() => signout()}>Sign out</button>
    </div>
  )
}

export default Dashboard