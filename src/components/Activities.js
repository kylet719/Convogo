import React from 'react'
import { useRef } from 'react';
import { useDrag, useDrop } from "react-dnd";
import { act } from 'react-dom/test-utils';


const Activity = ({activity, index, moveItem, deleteFunction, startDiscussion}) => {
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
        <h3>{activity.title} @ {activity.time}</h3>
        <button onClick = {() => deleteFunction(activity._id, index)}>Delete</button>
        <button onClick = {() => startDiscussion(activity._id, activity.title)}>Start Discussion</button>             
        <h4>{activity.date != null? (new Date(activity.date).toString()):("None")}</h4>
    </div>
  )
}


const Activities = ({activities, moveItem, deleteFunction, startDiscussion}) => {
  return (
    <>
    {activities.map((activity, idx) => (
      <Activity activity = {activity} index = {idx} moveItem = {moveItem} deleteFunction={deleteFunction} startDiscussion = {startDiscussion}/>
    ))}
    </>
  )
}

export default Activities