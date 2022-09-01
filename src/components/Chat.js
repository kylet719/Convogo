import React from 'react'
import { io } from 'socket.io-client'
import { useState, useEffect } from 'react'

const socket = io.connect("http://localhost:5001")

const Chat = ({topic}) => {
    const [message, setMessage] = useState("Message...")
    const [messageLog, setLog] = useState([])

    const sendMessage = (message) => {
        socket.emit("send_message", {message: message})
        setLog([...messageLog, message])

        //post message to the mongodb
    }

    useEffect( () => {
        socket.on("received_message", (data) => {
            console.log("MESSAGE RECEIVED" + messageLog)
            setLog([...messageLog, data.message])
        })

    }, [socket]);
    
    return (
        <div className = "chat">
            <li>
                {messageLog.map(item => (<ul>{item}</ul>))}
            </li>
            <input type="text" placeholder={message} onChange = {(e) => setMessage(e.target.value)}/>
            <button onClick = {() => sendMessage(message)}>Send Message</button>
            <button onClick={() => console.log(messageLog)}>Logger</button>

        </div>
    )
}

export default Chat