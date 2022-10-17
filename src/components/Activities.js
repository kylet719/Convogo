import React from 'react'
import { useRef } from 'react';
import { useDrag, useDrop } from "react-dnd";
import { act } from 'react-dom/test-utils';
import ViewEditModal from './Modal/ViewEditModal';
import EditActivity from "./Modal/ViewEditModal";



const Activity = ({ activity, index, moveItem, deleteFunction, startDiscussion, setActivity }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "activity",
    item: { id: activity._id, index },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const ref = useRef(null);
  const [, drop] = useDrop({
    accept: "activity",
    hover(activity, monitor) {
      if (!ref.current) {
        return
      }
      const dragIndex = activity.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return
      }

      const hoveredRect = ref.current.getBoundingClientRect();
      const hoverMiddleY = (hoveredRect.bottom - hoveredRect.top) / 2;
      const mousePosition = monitor.getClientOffset();
      const hoverClientY = mousePosition.y - hoveredRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      moveItem(dragIndex, hoverIndex);
      activity.index = hoverIndex;
    },
  });


  drag(drop(ref));

  return (
    <>
      <label onClick={event => setActivity(activity)} htmlFor="my-modal-10" className="modal-button">
        <div className="activity h-12"
          ref={ref}
          style={{ border: isDragging ? "5px solid #37CDBE" : "0px" }}>
          <h3>{activity.title}
            {/* @ {activity.time} */}
            <button className='btn mt-1 btn-outline btn-circle btn-error btn-xs float-right' onClick={() => deleteFunction(activity._id, index)}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
            <button className='mr-2 my-1 text-accent float-right hover:text-accent-focus' onClick={() => startDiscussion(activity._id, activity.title)}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
            </svg>
            </button>
          </h3>

          {/* <h4>{activity.date != null ? (new Date(activity.date).toString()) : ("None")}</h4> */}
        </div>
      </label>


    </>
  )
}


const Activities = ({ activities, moveItem, deleteFunction, startDiscussion, setActivity }) => {
  return (
    <>
      {activities.map((activity, idx) => (
        <Activity activity={activity} index={idx} moveItem={moveItem} deleteFunction={deleteFunction} startDiscussion={startDiscussion} setActivity={setActivity} />
      ))}
    </>
  )
}

export default Activities