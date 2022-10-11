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
        <div className='flex ml-4'>
            <div className='w-10 flex-none'>
                <p className='text-xs text-right mr-1'>{getTime(id)}</p>
            </div>
            <div className='vertical-line'></div>
            <div className='flex-grow'>
                <p className='inline-block'>{getName(id)}</p>
            </div>
            <div className='flex-none mr-4'>
                <button onClick={() => remove(id, index)} className='btn btn-outline btn-circle btn-error btn-xs'>×</button>
            </div>
        </div>
    )
}

export default ItineraryActicity;