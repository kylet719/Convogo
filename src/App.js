import { useState, useEffect } from "react";
import Itinerary from "./components/Itinerary";

function App() {
  const [itineraryItems, setItineraryItems] = useState()

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
    return data
  }

  console.log(itineraryItems)

  return (
    <div className="container">
      <Itinerary />
      <button onClick = {() => console.log(itineraryItems[0]["itinerary"])}> Test</button>
    </div>
  );
}

export default App;
