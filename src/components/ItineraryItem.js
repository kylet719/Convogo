import React from 'react'
import { useState } from 'react'
import { useDrop } from "react-dnd";
import ItineraryActicity from './ItinieraryActivity';
import ItineraryActivity from './ItinieraryActivity';

const ItineraryItem = ({ index, date, activities, deleteFunction, dropFunction, fullActivityList, removeActivity }) => {
  const [isExpanded, setExpanded] = useState(activities.length > 0)



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
    <div ref={drop} className="day" onClick={() => setExpanded(!isExpanded)} style={{ border: isOver ? "5px solid yellow" : "0px" }}>
      <h3 className="dayTitle">
        {new Date(date).toString().substring(0, 15)}
        <button className='btn btn-xs btn-outline btn-error float-right' onClick={() => deleteFunction(new Date(date).toString())}>Delete</button>
      </h3>

      {(isExpanded || isOver) && activities.length > 0 ?
        (
          <div className={isExpanded ? "activitiesList" : ""}>
            <ul>
              {activities.map((item) => (
                <li >
                  <ItineraryActicity index={index} activities={fullActivityList} id={item} remove={removeActivity}></ItineraryActicity>
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