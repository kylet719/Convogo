import React, { useState, useEffect } from "react";
import "./Modal.css";
import axios from 'axios'
import ReactDatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css'

export default function Modal({param, submitButton}) {
    const [modal, setModal] = useState(false);
    const [newDate, setDate] = useState(new Date());

    const onSubmit = (e) => {
        e.preventDefault()
        submitButton(newDate)
    }
    
    return ( 
        <div>
            <form onSubmit={onSubmit}>
                <label htmlFor="my-modal-6" className="btn modal-button">Add Date</label>

                <input type="checkbox" id="my-modal-6" className="modal-toggle" />
                <div className="box-content modal modal-bottom modal-middle">
                    <div className="modal-box w-80 h-96">
                        <ReactDatePicker
                            selected={newDate}
                            onChange={(date)=> setDate(date)}
                            inline
                        />
                        <div className="">
                            <div className="modal-action absolute bottom-0 right-0 m-3">
                            <input type="submit" value="Add" className="btn btn-primary" /> 
                            <label htmlFor="my-modal-6" className="btn">Close</label>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
  }

  //https://reactdatepicker.com/

