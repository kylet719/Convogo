import React from 'react'
import { useState } from 'react'
import { useDrop } from "react-dnd";
import ItineraryActivity from './ItinieraryActivity';

const ItineraryItem = ({ index, date, activities, deleteFunction, dropFunction, fullActivityList, removeActivity }) => {
  const [isExpanded, setExpanded] = useState(activities.length > 0)
  const [hasActivites, setActivities] = useState(activities.length > 0)


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
        {(hasActivites && !isExpanded) ? <div className='triangle-black inline-block mr-2'>^</div> : (hasActivites) ? <div className='triangle-black open inline-block mr-2'>^</div> : <div className='invisible inline-block mr-2'>^</div>}
        {new Date(date).toString().substring(0, 15)}
        <button className='btn btn-circle btn-xs btn-outline btn-error float-right' onClick={() => deleteFunction(new Date(date).toString())}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
        </button>
      </h3>

      {(isExpanded || isOver) && activities.length > 0 ?
        (
          <div className={isExpanded ? "activitiesList" : ""}>
            <ul>
              {activities.map((item) => (
                <li >
                  <ItineraryActivity index={index} activities={fullActivityList} id={item} remove={removeActivity} />
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