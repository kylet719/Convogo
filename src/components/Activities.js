import React from 'react'
import { useRef } from 'react';
import { useDrag, useDrop } from "react-dnd";
import { act } from 'react-dom/test-utils';


const Activity = ({activity, index, moveItem, refresh, deleteFunction}) => {
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
    <div className = "activity" 
         ref = {ref}
         style = {{border: isDragging ? "5px solid yellow": "0px"}}>
        <h3>{activity.title} @ {activity.time}
        <button className='btn btn-xs btn-outline btn-error float-right' onClick = {() => deleteFunction(activity._id, index)}>Delete</button>        
        </h3>
        <h4>{activity.date != null? (new Date(activity.date).toString()):("None")}</h4>
    </div>
  )
}


const Activities = ({activities, moveItem, deleteFunction}) => {
  return (
    <>
    {activities.map((activity, idx) => (
      <Activity activity = {activity} index = {idx} moveItem = {moveItem} deleteFunction={deleteFunction}/>
    ))}
    </>
  )
}

export default Activities