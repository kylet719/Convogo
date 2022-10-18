import React, { useState, useEffect } from "react";
import "./Modal.css";

export default function Modal({ createEvent }) {
  const [modal, setModal] = useState(false);
  const [eventName, setEventName] = useState("")
  const [note, setNote] = useState("")

  const onSubmit = (e) => {
    e.preventDefault()
    createEvent(eventName)
  }

  return (
    <div className="">
      <div id="wrap">
        <label htmlFor="my-modal-3" className="btn">Start an event!</label>
      </div>

      <input type="checkbox" id="my-modal-3" className="modal-toggle" />
      <div className="modal modal-bottom modal-middle">
        <div className="modal-box w-72 h-80">
          <form onSubmit={onSubmit}>

            <div className="">

              {/* Event Name */}
              <label className="label">
                <span className="label-text">Event Name: </span>
              </label>
              <input
                type="text"
                className="input input-bordered w-full max-w-xs"
                value={eventName}
                onChange={(e) => setEventName(e.target.value)}
                name="title"
                label="Title"
              />
            </div>
            <div className="modal-action absolute bottom-0 right-0 m-3">
              <input type="submit" value="Create" className="btn btn-primary" />
              <label htmlFor="my-modal-3" className="btn">Close</label>
            </div>


          </form>

        </div>
      </div>

    </div>
  );
}
    //https://reactdatepicker.com/
