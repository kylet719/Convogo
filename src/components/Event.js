import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Activities from "./Activities";
import DateAdd from "./Modal/DateModal";
import ActivityAdd from "./Modal/ActivityModal";
import ViewEditModal from "./Modal/ViewEditModal";
import InviteModal from "./Modal/InviteModal";
import ItineraryItem from "./ItineraryItem";
import Chat from "./Chat";
import Activity from "./Activities";
import { io } from 'socket.io-client'
import Nav from "./Sidebar";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import jwtDecode from "jwt-decode";
import Members from "./Members";
import Sidebar from "./Sidebar";

const socket = io.connect("http://localhost:5001")

const Event = () => {
  const [eventItems, setEventItems] = useState("")
  const [status, setComplete] = useState(false)
  const params = useParams()
  //TEMPORARY UNTIL WE GET ACCOUNTS GOING
  const [username, setUsername] = useState("")
  const [userObject, setUserObject] = useState()

  const testActivity = {
    title: "test",
  };

  const [activity, setActivity] = useState(testActivity)


  //#region database calls
  useEffect(() => {
    const obj = jwtDecode(localStorage.getItem("user"));
    setUserObject(obj);

    const getEvents = async () => {
      const taskFromServer = await fetchEvent()
      setEventItems(taskFromServer)
    }
    getEvents()



  }, [])

  const fetchEvent = async (id) => {
    const res = await fetch(`http://localhost:5000/events/${params.id}`)
    const data = await res.json()
    setComplete(true)
    return data
  }

  const deleteDay = (dayString) => {
    // Removes linkage between a deleted day and its activities
    const indexOfDeleteDay = eventItems["itinerary"].findIndex(item => new Date(item.date).toString() === dayString)
    eventItems["itinerary"][indexOfDeleteDay]["activityids"].forEach(id => {
      const indexOfLinkedDay = eventItems["activities"].findIndex(item => item._id === id)
      eventItems["activities"][indexOfLinkedDay]["date"] = null
    })

    const filteredItinerary = eventItems["itinerary"].filter(item => new Date(item.date).toString() !== dayString)
    const updatedEvent = {
      activities: eventItems.activities,
      discussion: eventItems.discussion,
      editors: eventItems.editors,
      owner: eventItems.owner,
      title: eventItems.title,
      itinerary: filteredItinerary
    };
    console.log(updatedEvent)
    axios.post('http://localhost:5000/events/update/' + params.id, updatedEvent).then(res => console.log(res.data));
    window.location = '/event/' + params.id;
  }

  const removeActivity = (id, index) => {

    eventItems["itinerary"][index]["activityids"] = eventItems["itinerary"][index]["activityids"].filter(item => item != id);

    const indexOfActivityWeNeed = eventItems["activities"].findIndex(item => item._id === id)

    eventItems["activities"][indexOfActivityWeNeed]["date"] = null

    axios.post('http://localhost:5000/events/update/' + params.id, eventItems).then(res => console.log(res.data));
    setEventItems(eventItems);
    window.location = '/event/' + params.id;

  }

  const deleteActivity = (activity, index) => {
    console.log(activity);
    console.log(index);
    const date = eventItems["activities"][index].date;
    console.log("activity date: " + date);
    var flag = (date != null);
    var newItinerary;
    if (flag) {
      // Removes linkage between a deleted day and its activities
      const indexOfDeleteDay = eventItems["itinerary"].findIndex(item => new Date(item.date).toString() == new Date(date).toString())
      const test = eventItems["itinerary"].forEach(item => console.log("itinieray dates: " + new Date(item.date).toString()))

      console.log(eventItems)
      console.log("INDES" + indexOfDeleteDay)



      const filteredActivities = eventItems["itinerary"][indexOfDeleteDay]["activityids"].filter(item => item != activity)

      const day = eventItems["itinerary"][indexOfDeleteDay];
      const updatedday = {
        date: day.date,
        activityids: filteredActivities,
      }
      console.log(updatedday);

      // filter out the old day
      const filteredItinerary = eventItems["itinerary"].filter((item, index) => index !== indexOfDeleteDay);
      console.log(filteredItinerary);

      newItinerary = addToItinerary(filteredItinerary, updatedday);

      console.log(newItinerary);

    }

    console.log("delete" + activity)
    const filteredActivities = eventItems["activities"].filter(item => item._id !== activity)
    const updatedEvent = {
      activities: filteredActivities,
      discussion: eventItems.discussion,
      editors: eventItems.editors,
      owner: eventItems.owner,
      title: eventItems.title,
      itinerary: flag ? newItinerary : eventItems.itinerary
    };
    console.log(updatedEvent)
    axios.post('http://localhost:5000/events/update/' + params.id, updatedEvent).then(res => console.log(res.data));
    window.location = '/event/' + params.id;

  }

  //#endregion

  //#region Drag and Drop stuff

  /**
   * Passed down into itineraryitem to enable drag and drop
   * @param {id of the dragged Activity in string} id 
   * @param {date of the itinerary day in string} date 
   */
  const dndActivity2Day = (id, date) => {
    // Links the activity to the day
    const dateIndex = eventItems["itinerary"].findIndex(item => new Date(item.date).toString() === date)
    const activityIndex = eventItems["activities"].findIndex(item => item._id === id)

    console.log(eventItems["activities"][activityIndex]["date"])

    // You can only drop into day if the day isn't already in there + day isn't associate with a day already
    console.log("Attempting to put " + eventItems["activities"][activityIndex]["title"] + " to " + eventItems["itinerary"][dateIndex]["date"])
    if (!eventItems["itinerary"][dateIndex]["activityids"].includes(id) && eventItems["activities"][activityIndex]["date"] === null) {
      //Links activity to the day
      eventItems["itinerary"][dateIndex]["activityids"].push(id)
      //Links the day to the activity
      eventItems["activities"][activityIndex]["date"] = new Date(date).toString()

      const updatedEvent = {
        activities: eventItems.activities,
        discussion: eventItems.discussion,
        editors: eventItems.editors,
        owner: eventItems.owner,
        title: eventItems.title,
        itinerary: eventItems.itinerary
      };

      axios.post('http://localhost:5000/events/update/' + params.id, updatedEvent).then(res => console.log(res.data));
      setEventItems(updatedEvent)
    }
  };

  const moveItem = (dragIndex, hoverIndex) => {
    const item = eventItems["activities"][dragIndex];
    const newActivities = eventItems["activities"].filter((i, idx) => idx !== dragIndex);
    newActivities.splice(hoverIndex, 0, item);
    const updatedEvent = {
      activities: newActivities,
      discussion: eventItems.discussion,
      editors: eventItems.editors,
      owner: eventItems.owner,
      title: eventItems.title,
      itinerary: eventItems.itinerary
    };

    if (newActivities.length === eventItems["activities"].length) {
      console.log(newActivities)
      axios.post('http://localhost:5000/events/update/' + params.id, updatedEvent).then(res => console.log(res.data));

    }
    setEventItems(updatedEvent)
  };
  //#endregion

  function addToItinerary(itinerary, day) {
    if (itinerary == 0) {
      eventItems.itinerary.push(day)
    } else {
      for (var i = 0; i < itinerary.length; i++) {
        if (new Date(day.date.toString()) - new Date(itinerary[i]["date"]) < 0) {
          break;
        }
      }
      itinerary.splice(i, 0, day)
    }
    return itinerary;
  }

  // Can probably move back into the DateModal
  const dateModalSubmit = (newDate) => {
    const newItineraryItem = {
      date: new Date(newDate.toString()),
      activityids: []
    };
    const newItinerary = addToItinerary(eventItems.itinerary, newItineraryItem);
    const updatedEvent = {
      activities: eventItems.activities,
      discussion: eventItems.discussion,
      editors: eventItems.editors,
      owner: eventItems.owner,
      title: eventItems.title,
      itinerary: newItinerary,
    };
    axios.post('http://localhost:5000/events/update/' + params.id, updatedEvent).then(res => console.log(res.data));
    setEventItems(updatedEvent)
    window.location = '/event/' + params.id;
  }

  // Can probably move back into the ActivityModal
  const activityModalSubmit = (activity) => {
    console.log(activity)
    console.log(Date.parse(activity.date))


    eventItems.activities.push(activity);


    const updatedEvent = {
      activities: eventItems.activities,
      discussion: eventItems.discussion,
      editors: eventItems.editors,
      owner: eventItems.owner,
      title: eventItems.title,
      itinerary: eventItems.itinerary,
    };

    console.log(updatedEvent)

    axios.post('http://localhost:5000/events/update/' + params.id, updatedEvent).then(res => console.log(res.data));
    setEventItems(updatedEvent)
    window.location = '/event/' + params.id;

  }

  const refresh = () => {
  }

  const addNewDiscussion = (activityIdToLinkTo, activityNameToLinkTo) => {
    console.log(activityIdToLinkTo + " and " + activityNameToLinkTo)
    const newChatLog = {
      messages: [],
      activityid: activityIdToLinkTo,
      activityname: activityNameToLinkTo
    }

    console.log(newChatLog);
    axios.post('http://localhost:5000/chats/add', newChatLog).then(res => {
      eventItems["discussion"].push(res.data);
      axios.post('http://localhost:5000/events/update/' + params.id, eventItems).then(res => console.log(res.data));
      setEventItems(eventItems);
      window.location = '/event/' + params.id;
    });
  }

  const deleteDiscussion = (discussionId) => {
    axios.delete(`http://localhost:5000/chats/${discussionId}`).then(res => console.log(res.data));
    eventItems["discussion"] = eventItems["discussion"].filter(item => item != discussionId);
    axios.post('http://localhost:5000/events/update/' + params.id, eventItems).then(res => console.log(res.data));
    setEventItems(eventItems);
    window.location = '/event/' + params.id;
  }

  const sendInvite = (email, note) => {
    const newInvite = {
      senderEmail: userObject["email"],
      senderPic: userObject["picture"],
      senderName: userObject["name"],
      eventId: eventItems["_id"],
      eventTitle: eventItems["title"],
      receiveEmail: email,
      note: note
    };
    axios.post("http://localhost:5000/invitations/add", newInvite).then(res => console.log(res.data));
  }

  const updateActivity = (activityID, location, time, title, details) => {

    const indexOfActivityWeNeed = eventItems["activities"].findIndex(activity => activity._id === activityID)

    console.log(indexOfActivityWeNeed);

    eventItems["activities"][indexOfActivityWeNeed]["location"] = location;
    eventItems["activities"][indexOfActivityWeNeed]["time"] = time;
    eventItems["activities"][indexOfActivityWeNeed]["title"] = title;
    eventItems["activities"][indexOfActivityWeNeed]["details"] = details;


    axios.post('http://localhost:5000/events/update/' + params.id, eventItems).then(res => console.log(res.data));
    setEventItems(eventItems);
    window.location = '/event/' + params.id;

  }

  const getUninvitied = (uninvitedId) => {
    console.log(uninvitedId)
    eventItems["editors"] = eventItems["editors"].filter(i => i.googleId !== uninvitedId);
    axios.post('http://localhost:5000/events/update/' + params.id, eventItems).then(res => {
      setEventItems(eventItems);
      axios.get(`http://localhost:5000/users/${uninvitedId}`).then(res => {
        const personUninvited = res.data;
        personUninvited["pEventsInProgress"] = personUninvited["pEventsInProgress"].filter(i => i !== eventItems["_id"])
        axios.post(`http://localhost:5000/users/update/${uninvitedId}`, personUninvited).then(res => {
          window.location = '/event/' + params.id;
        });
      });
    }
    );
  }

  return (
    <>
      {status ?
        (
          <div id="parent">

            <div className="drawer drawer-mobile">
              <input id="my-drawer" type="checkbox" className="drawer-toggle" />
              <div className="drawer-content">
                {/* <!-- Page content here --> */}

                <div className="navbar bg-base-100">
                  <div className="flex-none">
                    {/* <a href='/' className="btn btn-ghost normal-case text-xl">Convogo</a> */}
                    <button onClick={() => window.location = '/'} className="btn btn-ghost normal-case text-xl">Convogo</button>
                  </div>
                  <div className="flex-1">
                    <button className="btn btn-square btn-ghost">
                      <label htmlFor="my-drawer" className="btn btn-ghost drawer-button lg:hidden lg:hover:invisible">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-5 h-5 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                      </label>
                    </button>
                  </div>
                  {/* <div className="flex-1">
                    <a href='/' className="btn btn-ghost normal-case text-xl">Convogo</a>
                  </div> */}
                  <div className="flex-none">
                    <button className="btn btn-square btn-ghost">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-5 h-5 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"></path></svg>
                    </button>
                  </div>
                </div>


                <div className="eventview divide-x flex items-start">

                  {/* VERTICAL EVENT NAME */}
                  <div className="relative min-h-screen max-h-screen">
                    <h1 className="title left absolute">{eventItems["title"]}</h1>
                    <div className="absolute bottom-0 left-0">
                      <button className="btn" onClick={() => console.log(eventItems)}>Log Current Event</button>
                      <button className="btn" onClick={() => console.log(userObject)}>Test</button>
                    </div>
                  </div>

                  {/* ACTIVITIES PANEL */}
                  <div className="Activites overflow-auto mx-2 min-h-screen max-h-screen relative">
                    <h1 className="heading">Activities</h1>
                    <Activities activities={eventItems["activities"]}
                      moveItem={moveItem}
                      deleteFunction={deleteActivity}
                      refresh={refresh}
                      startDiscussion={addNewDiscussion}
                      setActivity={setActivity}
                    />
                    <ViewEditModal activity={activity} updateActivity={updateActivity} ></ViewEditModal>
                    <ActivityAdd param={eventItems["_id"]} submitButton={activityModalSubmit} />


                  </div>

                  {/* ITINIERARY PANEL  */}
                  <div className="itinerary overflow-atuo mx-2 min-h-screen max-h-screen">
                    <h1 className="heading">Itinerary</h1>
                    <>
                      {eventItems["itinerary"].map((day, index) => (
                        <div >
                          <ItineraryItem
                            index={index}
                            date={day.date}
                            activities={day.activityids}
                            deleteFunction={deleteDay}
                            dropFunction={dndActivity2Day}
                            fullActivityList={eventItems["activities"]}
                            removeActivity={removeActivity}
                          />
                        </div>
                      ))}
                    </>
                    <DateAdd param={eventItems["_id"]} submitButton={dateModalSubmit} />
                  </div>

                  {/* DISCUSSION PANEL  */}
                  <div className="Discussion overflow-auto mx-2 min-h-screen max-h-screen">
                    <h1 className="heading">Discussion</h1>
                    <>
                      {eventItems["discussion"].map((discussionId) => (
                        <div >
                          <Chat discussionId={discussionId} socket={socket} username={username} deleteDiscussion={deleteDiscussion} account={userObject} />
                        </div>
                      ))}
                    </>

                    <div id="wrap">
                      <button className="icon btn btn-circle btn-secondary btn-outline modal-button" id="plus" onClick={() => addNewDiscussion()}></button>
                    </div>
                  </div>

                  {/*MEMBERS PANEL*/}
                  <div className="Members mx-2 min-h-screen max-h-screen">
                    <h1 className="heading">Members</h1>
                    <Members memberList={eventItems["editors"]} isOwner={userObject["sub"]===eventItems["owner"] } currentUser={userObject["sub"]} uninvite ={getUninvitied}/>
                    <InviteModal sendInvite={sendInvite} />
                  </div>

                </div>

              </div>

              <Sidebar userObject={userObject} />


            </div>

          </div>

        )
        :
        (<h1>LOADING</h1>)}
    </>

  );
}


export default Event