// This would be the dropWrapper 

import React from 'react'
import ItineraryItem from './ItineraryItem';
import { useDrop } from 'react-dnd/dist/hooks';

//DropWrapper
const Itinerary = ({dayList, deleteFunction}) => {

  // const [{isOver}, drop] = useDrop({
  //   accept: ACTIVITY,
  //   canDrop: (item, monitor) => {
  //     const itemIndex = statuses.findIndex(si => si.statuses === item.status)
  //   },
  //   drop: (item, monitor) => {
  //     onDrop(item, monitor,status);
  //   },
  //   collect: monitor => ({
  //     isSOver: monitor.isOver()
  //   })
  // })


  console.log("Testing " + dayList)
  return (
    <>
    {dayList.map((day) => (
      <ItineraryItem date = {day.date} activites = {day.activites} deleteFunction = {deleteFunction}/>
    ))}
    </>
  )
}

export default Itinerary;