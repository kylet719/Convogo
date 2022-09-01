import React from 'react'
import { useState } from 'react'
import { useDrop } from "react-dnd";

const ItineraryItem = ({date, activities, deleteFunction, dropFunction, fullActivityList}) => {
  const[isExpanded, setExpanded] = useState( activities.length >0)
  const getActivityName = (stringId) => {
    const activity =  fullActivityList.filter((item) => item._id === stringId)[0]
    return activity["title"]+ " @ " + activity["time"] 
  }

  //#region Drag and drop stuff
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "activity",
    drop: (activity) => dropAndShow(activity),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  //Used to automatically show list of activities once dropped
  const dropAndShow = (activity) => {
    dropFunction(activity.id, new Date(date).toString())
    setExpanded(true)
  }
  //#endregion

  return (
    <div ref = {drop } className = "day" onClick = {()=> setExpanded(!isExpanded)} style = {{border: isOver ? "5px solid yellow": "0px"}}> 
      <h3 className = "dayTitle">
        {new Date(date).toString().substring(0,15)}
        <button onClick = {() => deleteFunction(new Date(date).toString())}>Delete</button>
      </h3>
    
      { (isExpanded || isOver) && activities.length >0? 
      (
      <div className = {isExpanded ? "activitiesList" : ""}>
      <ul>
          {activities.map((item) => (
            <li > 
              {getActivityName(item)}
            </li>
          ))}
      </ul>
      </div>
      ) 
      : 
      ("")
      }

    </div>
  )
}

export default ItineraryItem