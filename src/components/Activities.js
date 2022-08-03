import React from 'react'

const Activity = ({activity}) => {
  return (
    <div className = "activity">
        <h3>{activity.title} @ {activity.time}</h3>
    </div>
  )
}


const Activities = ({activities}) => {
  return (
    <>
    {activities.map((activity) => (
      <Activity activity = {activity}/>
    ))}
    </>
  )
}

export default Activities