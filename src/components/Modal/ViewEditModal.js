import React from 'react'
import "./Modal.css";


const ViewEditModal = ({ activity, updateActivity }) => {

    const onSubmit = (e) => {
        const location = document.getElementById('location').value == "" ? activity.location : document.getElementById('location').value;
        const time = document.getElementById('time').value == "" ? activity.time : document.getElementById('time').value;
        const title = document.getElementById('title').value == "" ? activity.title : document.getElementById('title').value;
        const details = document.getElementById('details').value == "" ? activity.title : document.getElementById('details').value;
        e.preventDefault()
        updateActivity(activity._id, location, time, title, details);
    }

    return (
        <div>
            {/* <!-- Put this part before </body> tag-- > */}
            <input type="checkbox" id="my-modal-10" className="modal-toggle" />
            <div className="modal modal-bottom sm:modal-middle">
                <div className="modal-box h-96 relative">
                    <form onSubmit={onSubmit}>
                        <h3 className="text-6xl mt-2 ml-2 left absolute">{activity.title}</h3>
                        <div class="absolute left-20 top-2 bottom-2 -ml-0.5 w-0.5 bg-gray-300"></div>
                        <div className='absolute top-2 left-24 right-5'>
                            <h3 className='uppercase text-xl font-medium mb-2'>Logistics</h3>

                            <p className='text-sm mb-3 text-black'>Title:
                                <input type="text" id='title' placeholder={activity.title} className="text-sm placeholder:text-sm placeholder:text-black focus:border-none focus:outline-none focus:ring-none input input-ghost input-xs w-full max-w-xs" />
                            </p>

                            <p className='text-sm mb-3'>Day: {new Date(activity.date).toString().substring(0, 15)}</p>

                            <p className='text-sm mb-3 text-black'>Location:
                                <input type="text" id='location' placeholder={activity.location} className="text-sm placeholder:text-sm placeholder:text-black focus:border-none focus:outline-none focus:ring-none input input-ghost input-xs w-full max-w-xs" />
                            </p>

                            <p className='text-sm mb-3'>Time:
                                <input type="text" id='time' placeholder={activity.time} className="text-sm placeholder:text-sm placeholder:text-black focus:border-none focus:outline-none focus:ring-none input input-ghost input-xs w-full max-w-xs" />
                            </p>

                            <h3 className='uppercase text-xl font-medium mb-2'>Details</h3>
                            <textarea id='details' placeholder={activity.details} className="placeholder:text-black textarea textarea-bordered w-full overflow-y align-top overflow-visible" />

                        </div>
                        <div className="modal-action absolute bottom-2 right-2">
                            <input type="submit" value="Save" className="btn btn-primary" />
                            <label htmlFor="my-modal-10" className="btn">Close</label>
                        </div>
                    </form>
                </div>
            </div>

        </div >
    )
}

export default ViewEditModal
