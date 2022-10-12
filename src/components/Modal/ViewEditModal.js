import React from 'react'
import "./Modal.css";

const ViewEditModal = ({ activity }) => {

    return (
        <div>
            {/* <!-- Put this part before </body> tag-- > */}
            <input type="checkbox" id="my-modal-10" className="modal-toggle" />
            <div className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">{activity.title}</h3>
                    <p className="py-4">{new Date(activity.date).toString()}</p>
                    <div className="modal-action">
                        <label htmlFor="my-modal-10" className="btn">Yay!</label>
                    </div>
                </div>
            </div>

        </div >
    )
}

export default ViewEditModal
