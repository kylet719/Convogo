import React, { useState, useEffect } from "react";
import "./Modal.css";
import axios from 'axios'
import ReactDatePicker from "react-datepicker";

export default function Modal({param}) {
  const [modal, setModal] = useState(false);
  const [currentEvent, setEvent] = useState('');
  const [newDate, setDate] = useState(new Date());

  const toggleModal = () => {
    setModal(!modal);
  };

  // Don't use API call here in the future
  useEffect( () => {
    axios.get('http://localhost:5000/events/'+param).then(response => {
        setEvent(response.data)
    })
  }, [])

  //#region  Modal stuff dunno what it does
  if(modal) {
    document.body.classList.add('active-modal')
  } else {
    document.body.classList.remove('active-modal')
  }
  //#endregion


  const onSubmit = (e) => {
    e.preventDefault()
    const newItineraryItem = {
        date: newDate,
        activityids: []
    };
    const updatedEvent = {
      activities: currentEvent.activities,
      discussion: currentEvent.discussion,
      editors: currentEvent.editors,
      owner: currentEvent.owner,
      title: currentEvent.title,
      itinerary: [...currentEvent.itinerary, newItineraryItem]
    };

    console.log(updatedEvent);
    axios.post('http://localhost:5000/events/update/'+param, updatedEvent)
      .then(res => console.log(res.data));

    window.location = '/';

}


  return (
    <>
      <button onClick={toggleModal} className="btn-modal">
        +
      </button>

      {modal && (
        <div className="modal">
          <div onClick={toggleModal} className="overlay"></div>
          <div className="modal-content">
            <h2>Add Date</h2>

            <form onSubmit={onSubmit}>

            <div className="form-group">
                <label>Date: </label>
                <input 
                    type="text" 
                    className="form-control"
                    onChange={(e)=> setDate(e.target.value)}
                    />
                    <ReactDatePicker />
                  
            </div>

            <div className="form-group">
                <input type="submit" value="Add" className="btn btn-primary" />
            </div>
            </form>

            <button className="close-modal" onClick={toggleModal}>
              CLOSE
            </button>
          </div>
        </div>
      )}
    </>
  );
}