import React, { useState, useEffect } from "react";
import "./Modal.css";
import 'react-datepicker/dist/react-datepicker.css';

const newActivity = {
  title: "",
  location: "",
  time: "",
  date: null,
  relateddiscussions: []
};

// GET INPUTS TO POPULATE NEW ACTVITY

export default function Modal({ param, submitButton }) {
  const [activity, setActivity] = useState(newActivity);

  const onSubmit = (e) => {
    e.preventDefault()
    submitButton(activity)
    document.getElementById('my-modal-6').checked = false;
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setActivity({
      ...activity,
      [name]: value,
    });
  };

  return (
    <div className="">
      <div id="wrap">
        <label htmlFor="my-modal-6" id="plus" className="icon btn btn-circle btn-secondary btn-outline modal-button"></label>
      </div>

      <input type="checkbox" id="my-modal-6" className="modal-toggle" />
      <div className="modal modal-bottom modal-middle">
        <div className="modal-box w-72 h-96">
          <form onSubmit={onSubmit}>

            <div className="">

              {/* title */}
              <label className="label">
                <span className="label-text">Title: </span>
              </label>
              <input
                type="text"
                className="input input-bordered w-full max-w-xs"
                value={activity.title}
                onChange={handleInputChange}
                name="title"
                label="Title"
              />

              {/* location */}
              <label className="label">
                <span className="label-text">Location: </span>
              </label>
              <input
                type="text"
                className="input input-bordered w-full max-w-xs"
                value={activity.location}
                onChange={handleInputChange}
                name="location"
                label="Location"
              />

              {/* time */}
              <label className="label">
                <span className="label-text">Time: </span>
              </label>
              <input
                type="text"
                className="input input-bordered w-full max-w-xs"
                value={activity.time}
                onChange={handleInputChange}
                name="time"
                label="Time"
              />

            </div>
            <div className="modal-action absolute bottom-0 right-0 m-3">
              <input type="submit" value="Add" className="btn btn-primary" />
              <label htmlFor="my-modal-6" className="btn">Close</label>
            </div>


          </form>

        </div>
      </div>

    </div>
  );
}