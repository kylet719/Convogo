import React from 'react'
import axios from "axios";
import { useState, useEffect } from 'react'
import ScrollToBottom from "react-scroll-to-bottom";

function Chat({username, discussionId, socket, deleteDiscussion, account}) {
    const [currentMessage, setCurrentMessage] = useState("");
    const [chatTitle, setChatTitle] = useState("No title");
    const [messageList, setMessageList] = useState([]);

    useEffect(() => {
      //Initial pull to get chatlog from db
      const getChatLog = async() => {
        const taskFromServer = await fetchChatLog()
        taskFromServer ? setMessageList(taskFromServer["messages"]) : setMessageList([])
        taskFromServer ? setChatTitle(taskFromServer["activityname"]) : setChatTitle("No title")
      }
      getChatLog()
      
      //Listener that listens on port:5001 to receive messages
      socket.on("received_message", (data) => {
        console.log("MESSAGE RECEIVED " + data.message + " for chatroom " + data.chatroom + " but this is chatroom " + discussionId);
        if (data.chatroom == discussionId) {
          console.log("CORRECT ROOM")
          setMessageList((list) => [...list, data]);
        }
      });
    }, [socket]);

    const fetchChatLog = async () => {
      const res = await fetch(`http://localhost:5000/chats/${discussionId}`)
      const data = await res.json()
      return data
    }
  
    const sendMessage = async () => {
      if (currentMessage !== "") {
        const messageData = {
          author: account["name"],
          message: currentMessage,
          chatroom: discussionId,
          time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes(),
          authorId: account["sub"]
        };
        await socket.emit("send_message", messageData);
        messageList.push(messageData);
        setMessageList(messageList);
        const updatedLog = {
          messages: messageList
        };
        axios.post('http://localhost:5000/chats/update/'+discussionId, updatedLog).then(res => console.log(res.data));
        setCurrentMessage("");
      }
    };

    return (
      <div className="chat-window">
        <div className="chat-header"><p>{chatTitle} <button onClick={() => deleteDiscussion(discussionId)}> Delete Chat</button></p>
        </div>
        
        <div className="chat-body">
          <ScrollToBottom className="message-container">
            {messageList.map((messageContent) => {
              return (
                <div
                  className="message"
                  id={account["sub"] === messageContent.authorId ? "other" : "you"}
                >
                  <div>
                    <div className="message-content">
                      <p>{messageContent.message}</p>
                    </div>
                    <div className="message-meta">
                      <p id="time">{messageContent.time}</p>
                      <p id="author">{messageContent.author}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </ScrollToBottom>
        </div>
        <div className="chat-footer">
          <input
            type="text"
            value={currentMessage}
            placeholder="Hey..."
            onChange={(event) => {
              setCurrentMessage(event.target.value);
            }}
            onKeyPress={(event) => {
              event.key === "Enter" && sendMessage();
            }}
          />
          <button onClick={sendMessage}>&#9658;</button>
        </div>
      </div>
    );
  }
  
  export default Chat;