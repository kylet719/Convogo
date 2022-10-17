import React from 'react'
import Activities from './Activities';

const ItineraryActicity = ({ index, activities, id, remove }) => {
    const getName = (stringId) => {
        const activity = activities.filter((item) => item._id === stringId)[0]
        return activity["title"]
    }

    const getTime = (stringId) => {
        const activity = activities.filter((item) => item._id === stringId)[0]
        return activity["time"]
    }

    return (
        <div className='flex ml-4 h-8'>
            <div className='w-16 flex-none'>
                <p className='text-xs text-right mr-2 mt-1'>{getTime(id)}</p>
            </div>
            <div className='vertical-line'></div>
            <div className='flex-grow'>
                <p className='inline-block'>{getName(id)}</p>
            </div>
            <div className='flex-none px-3.5'>
                <button onClick={() => remove(id, index)} className='btn btn-outline btn-circle btn-error btn-xs'>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
            </div>
        </div>
    )
}

export default ItineraryActicity;