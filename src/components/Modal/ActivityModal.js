import React, { useState, useEffect } from "react";
import "./Modal.css";
import axios from 'axios'
import ReactDatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';

const newActivity = {
  title: "",
  location: "",
  time: "",
  date: null,
  relateddiscussions: []
};

// GET INPUTS TO POPULATE NEW ACTVITY

export default function Modal({param, submitButton}) {
  const [modal, setModal] = useState(false);
  const [newTitle, setTitle] = useState("");
  const [newLocation, setLocation] = useState("");
  const [newTime, setTime] = useState("");
  const [newDate, setDate] = useState(new Date());
  const [newRelatedDiscussions, setRelatedDiscussions] = useState([]);
  const [activity, setActivity] = useState(newActivity);

  const toggleModal = () => {
    setModal(!modal);
  };

  //#region  Modal stuff dunno what it does
  if(modal) {
    document.body.classList.add('active-modal')
  } else {
    document.body.classList.remove('active-modal')
  }
  //#endregion

  const onSubmit = (e) => {
    e.preventDefault()
    submitButton(activity)
}

const handleInputChange = (e) => {
  const { name, value } = e.target;
  setActivity({
    ...activity,
    [name]: value,
  });
};


  return (
    <>
      <button onClick={toggleModal} className="btn-modal">
        +
      </button>

      {modal && (
        <div className="modal">
          <div onClick={toggleModal} className="overlay"></div>
          <div className="modal-content">
            <h2>Add Activity</h2>

            <form onSubmit={onSubmit}>  

            <div className="form-group">

              {/* title */}
              <label className="form-brk">Title: </label>              
              <input 
                value={activity.title}
                onChange={handleInputChange} 
                name="title" 
                label="Title" 
                />

              {/* location */}
              <label className="form-brk">Location: </label>
              <input 
                value={activity.location}
                onChange={handleInputChange} 
                name="location" 
                label="Location" 
                />

              {/* time */}
              <label className="form-brk">Time: </label>
              <input 
                value={activity.time}
                onChange={handleInputChange} 
                name="time" 
                label="Time" 
                />                                               

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