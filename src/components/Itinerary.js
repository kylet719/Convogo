// this isn't really being used anymore

import React from 'react'
import ItineraryItem from './ItineraryItem';
import { useDrop } from 'react-dnd/dist/hooks';

const Itinerary = ({dayList, deleteFunction}) => {

  return (
    <>
    {dayList.map((day) => (
      <ItineraryItem date = {day.date} activities = {day.activityids} deleteFunction = {deleteFunction}/>
    ))}
    </>
  )
}

export default Itinerary;