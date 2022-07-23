import { useState, useEffect } from "react";
import Itinerary from "./components/Itinerary";

function App() {
  const [itineraryItems, setItineraryItems] = useState()
  const [status, setComplete] = useState(false)

  useEffect( () => {
    const getTasks = async() => {
      const taskFromServer = await fetchData()
      setItineraryItems(taskFromServer)
    }

    getTasks()
  }, [])

  const fetchData = async () => {
    const res = await fetch('http://localhost:5000/events')
    const data = await res.json()
    setComplete(true)
    return data
  }


  return (
    <div className="container">

      <div className = "Activites">
        <h1>Activites</h1>
      </div>

      <div className = "itinerary">
        <h1>Itinerary</h1>
        {status ? (<Itinerary dayList = {itineraryItems[0]["itinerary"]} />):("") }
        ideally above would just be the id and link to the activities 
        <button onClick = {() => console.log(itineraryItems[0]["itinerary"])}> Test</button>
      </div>

      <div className = "Discussion">
        <h1>Discussion</h1>
      </div>

      <div className = "Members">
        <h1>Members</h1>
      </div>



      
    </div>
  );
}

export default App;
