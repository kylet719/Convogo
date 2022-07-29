import React from 'react'
import { useState } from 'react'

const ItineraryItem = ({date, activites}) => {
  const[isExpanded, setExpanded] = useState(false)

  return (
    <div className = "day" onClick = {()=> setExpanded(!isExpanded)}> 
      <h3>
        {date}
      </h3>

      {isExpanded ? 
      (
        <h2 className = 'list'>
          {JSON.stringify(activites)}
      </h2>
      ) 
      : 
      (
        <h2>
          Click to expand (will be a button)
      </h2>
      )}

    </div>
  )
}

export default ItineraryItem