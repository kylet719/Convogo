import React from 'react'

export default function nav({userObject}) {
    return (
        <div className="drawer-side">
                <label htmlFor="my-drawer" className="drawer-overlay"></label>
                <ul className="menu p-4 overflow-y-auto w-min bg-base-100 text-base-content">
                  {/* <!-- Sidebar content here --> */}
                  <li><img src={userObject["picture"]} alt="Profile Pic" /></li>
                  <li><a href="#">{userObject["name"]}</a></li>
                  
                  <li>
                    <button type="button" aria-controls="dropdown-example" data-collapse-toggle="dropdown-example">
                      <span >Upcoming Events</span>
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
                    </button>
                    <ul id="dropdown-example" className="hidden py-2 space-y-2">
                      <li>
                        <a href="#" className="flex items-center w-full p-2 text-base font-normal text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">Products</a>
                      </li>
                      <li>
                        <a href="#" className="flex items-center w-full p-2 text-base font-normal text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">Billing</a>
                      </li>
                      <li>
                        <a href="#" className="flex items-center w-full p-2 text-base font-normal text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">Invoice</a>
                      </li>
                    </ul>
                  </li>
                  <li><a href="#" onClick = {()=> {localStorage.removeItem("user"); window.location = '/';}}>Sign out</a></li>
                </ul>
              </div>
    )
}
