import React from 'react'
import ItineraryItem from './ItineraryItem';

const itinList = ({dayList, deleteFunction}) => {
  console.log("Testing " + dayList)
  return (
    <>
    {dayList.map((day) => (
      <ItineraryItem date = {day.date} activites = {day.activites} deleteFunction = {deleteFunction}/>
    ))}
    </>
  )
}

export default itinList;