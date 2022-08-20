import React from 'react'
import { useDrag, useDrop } from "react-dnd";


const Activity = ({activity}) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "activity",
    item: { id: activity._id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div className = "activity" 
         ref = {drag}
         style = {{border: isDragging ? "5px solid yellow": "0px"}}>
        <h3>{activity.title} @ {activity.time}</h3>
        <h4>{activity.date}</h4>
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