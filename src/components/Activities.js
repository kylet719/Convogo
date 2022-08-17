import React from 'react'
import { useDrag, useDrop } from "react-dnd";


const Activity = ({activity}) => {
  return (
    <div className = "activity">
        <h3>{activity.title} @ {activity.time}</h3>
    </div>
  )
}


const Activities = ({activities}) => {
  return (
    <>
    {activities.map((activity) => (
      <Activity activity = {activity}/>
    ))}
    </>
  )
}

export default Activities