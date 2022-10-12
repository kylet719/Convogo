import React from 'react'
import "./Modal.css";

const ViewEditModal = ({ activity }) => {

    return (
        <div>
            {/* <!-- Put this part before </body> tag-- > */}
            <input type="checkbox" id="my-modal-10" className="modal-toggle" />
            <div className="modal modal-bottom sm:modal-middle">
                <div className="modal-box h-96 relative">
                    <h3 className="text-6xl mt-2 ml-2 left absolute">{activity.title}</h3>
                    <div class="absolute left-20 top-2 bottom-2 -ml-0.5 w-0.5 bg-gray-300"></div>
                    <div className='absolute top-2 left-24 right-5'>
                        <h3 className='uppercase text-xl font-medium mb-2'>Logistics</h3>
                        <p className='text-sm mb-3'>Day: {new Date(activity.date).toString()}</p>
                        <p className='text-sm mb-3 text-black'>Location:
                            <input type="text" placeholder={activity.location} className="text-sm placeholder:text-sm placeholder:text-black focus:border-none focus:outline-none focus:ring-none input input-ghost input-xs w-full max-w-xs" />
                        </p>
                        <p className='text-sm mb-3'>Time:
                            <input type="text" placeholder={activity.time} className="text-sm placeholder:text-sm placeholder:text-black focus:border-none focus:outline-none focus:ring-none input input-ghost input-xs w-full max-w-xs" />
                        </p>
                    </div>
                    <div className="modal-action absolute bottom-2 right-2">
                        <label htmlFor="my-modal-10" className="btn">Save</label>
                    </div>
                </div>
            </div>

        </div >
    )
}

export default ViewEditModal
