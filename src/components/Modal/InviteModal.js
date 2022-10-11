import React, { useState, useEffect } from "react";
import "./Modal.css";

export default function Modal({ sendInvite }) {
    const [modal, setModal] = useState(false);
    const [receiver, setReceiver] = useState("")
    const [note, setNote]= useState("")
   
    const onSubmit = (e) => {
      e.preventDefault()
      sendInvite(receiver, note)
    }
  
    return (
        <div className="">
        <div id="wrap">
          <label htmlFor="my-modal-4" id="plus" className="icon btn btn-circle btn-secondary btn-outline modal-button"></label>
        </div>
  
        <input type="checkbox" id="my-modal-4" className="modal-toggle" />
        <div className="modal modal-bottom modal-middle">
          <div className="modal-box w-72 h-96">
            <form onSubmit={onSubmit}>
  
              <div className="">
  
                {/* sendTo */}
                <label className="label">
                  <span className="label-text">Send To: </span>
                </label>
                <input
                  type="text"
                  className="input input-bordered w-full max-w-xs"
                  value={receiver}
                  onChange={(e) => setReceiver(e.target.value)}
                  name="title"
                  label="Title"
                />
  
                {/* note */}
                <label className="label">
                  <span className="label-text">Note: </span>
                </label>
                <input
                  type="text"
                  className="input input-bordered w-full max-w-xs"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  name="location"
                  label="Location"
                />
              </div>
              <div className="modal-action absolute bottom-0 right-0 m-3">
                <input type="submit" value="Add" className="btn btn-primary" />
                <label htmlFor="my-modal-4" className="btn">Close</label>
              </div>
  
  
            </form>
  
          </div>
        </div>
  
      </div>
    );
  }
    //https://reactdatepicker.com/
  