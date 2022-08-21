import React, { useState, useEffect } from "react";
import "./Modal.css";
import axios from 'axios'
import ReactDatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css'

export default function Modal({param, submitButton}) {
  const [modal, setModal] = useState(false);
  const [newDate, setDate] = useState(new Date());

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
    submitButton(newDate)
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
                {/* <input 
                    type="text" 
                    className="form-control"
                    onChange={(e)=> setDate(e.target.value)}
                    /> */}
                    <ReactDatePicker
                selected={newDate}
                onChange={(date)=> setDate(date)}
              />
            </div>

            <div>
              
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