import React from 'react'
import { Link } from 'react-router-dom'

const Dashboard = ({userEvents}) => {
  return (
    <div>
        {userEvents.map((event) => (
          <div className="day"> 
          <Link className = {"whiteFont"} style={{ textDecoration: 'none' }} to={`/event/${event._id}`}>{event.title}</Link>
          </div>
    ))}
    </div>
  )
}

export default Dashboard