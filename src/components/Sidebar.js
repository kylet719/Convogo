import React from 'react'
import { useState } from 'react';
import { Link } from 'react-router-dom'

export default function Nav({ userObject, eventPackages }) {
  const [toggle, setToggle] = useState(false)

  return (
    <div className="drawer-side">
      <label htmlFor="my-drawer" className="drawer-overlay"></label>
      <ul className="menu p-4 overflow-y-auto w-min bg-base-100 text-base-content">
        {/* <!-- Sidebar content here --> */}
        <li><img src={userObject["picture"]} alt="Profile Pic" /></li>
        <li><p >{userObject["name"]}</p></li>

        <li>
          <button type="button" aria-controls="dropdown-example" data-collapse-toggle="dropdown-example" onClick = {() => setToggle(!toggle)}>
            <span >Upcoming Events</span>
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
          </button>
          {toggle && eventPackages? (<>
            {eventPackages.map((event) => (
                        <li>
                        <a onClick={() => {window.location = '/event/' + event._id;}} href="#" className="flex items-center w-full p-2 text-base font-normal text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">{event.title}</a>
                      </li>
                      ))}
          </>): ""}
          
        </li>
        <li className="absolute bottom-0 left-0"><a href="#" onClick={() => { localStorage.removeItem("user"); window.location = '/'; }}>Sign out</a></li>
      </ul>
    </div>
  )
}
