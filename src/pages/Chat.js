import React, {useState, useEffect, useRef} from "react";
import ArrowLeftIcon from '../assets/icons/ArrowLeft.svg';
import {Link} from 'react-router-dom';
import {useAuthState} from 'react-firebase-hooks/auth';
import {auth, signInWithGoogle} from '../firebase';
import ImageIcon from '../assets/images/Logo.svg';
import SendIcon from '../assets/icons/Send.svg';
import SearchIcon from '../assets/icons/Search.svg';
import OptionsIcon from '../assets/icons/Options.svg';
import { incrementUserActivity } from '../Activity/addUserActivity';

import '../pages/styles/Chat.css';


const Chat = ({userId}) => {
const [messages, setMessages] = useState([]);
const [newMessage, setNewMessage] = useState('');
const [fsError, setFsError] = useState(null);
const messagesEndRef = useRef(null);
const [user] = useAuthState(auth);
const [isTyping, setIsTyping] = useState(false);


useEffect(() => {
    if(userId){
        fetchMessages(userId);
           }
       }, [userId]);
       
  
useEffect(() => {
    // Scroll to the bottom of the messages container whenever messages change
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

const fetchMessages = async (userId) =>{

    try {
        const response = await fetch(`https://us-central1-cosmochat-ui-7b128.cloudfunctions.net/fetchMessages?userId=${userId}`);
        if(!response.ok){
            throw new Error('Failed to fetch messages');
        }
        const data = await response.json();
        setMessages(data.messages);
        }catch(error){
            console.error('Error fetching messages:', error);
            setFsError(error.message);
        }
    };


const handleSendMessage = async () => {
    if (!user) {
        setFsError("User not signed in");
        return;
    }

    setIsTyping(true);

const message = {
    text: newMessage,
    userId: user.uid, 
    timestamp: new Date().toISOString(),
};
console.log('Sending message:', JSON.stringify(message, null, 2)); 

try{
    const response = await fetch("https://us-central1-cosmochat-ui-7b128.cloudfunctions.net/sendMessage", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(message),
    });
    if(!response.ok){
        const errorResponse = await response.text(); // Capture server response for more details
        console.error('Server responded with error:', errorResponse);
        throw new Error('Failed to send message');
    }

    setIsTyping(false);

    const currentDate = new Date().toISOString().split('T')[0];
    await incrementUserActivity(currentDate);

   // Fetch updated messages after sending the message
        await fetchMessages(user.uid);

       // Add a delay before fetching AI response to simulate typing
         setTimeout(async () => {
            await fetchMessages(user.uid); // Fetch messages again to include AI response
        }, 1000);
        setNewMessage("");
}catch(error){
    console.error('Error sending message:', error);
    setFsError(error.message);
    setIsTyping(false);
}
};

useEffect(()=>{
    if (newMessage){
       
        const timer = setTimeout(() => {
            setIsTyping(false);
        },1000);
       
    return () => clearTimeout(timer);
    }
}, [newMessage]);


return(
<div className="chat-container">
    <div className="chat-header">
    <div className="chat-icon-left">
        <Link to="/"><img src={ArrowLeftIcon} alt="Arrow" className="chat-arrow" /></Link>
        <span className="chat-title">ReX</span>
        </div>
        <div className="chat-icon-right">
            <img src={SearchIcon} alt="Search" className="icon-search" />
            <img src={OptionsIcon} alt="Options" className="icon-options" />
        </div>
    </div>

<div className="chat-messages">
<img src={ImageIcon} alt="Logo" className="chat-avatar" />
{user ?(
messages.length > 0 ?(
    messages.map((message, index) => (
        <div
        key={index}
        className={`chat-message ${
            message.userId === "bot" ? "user-message" : "ai-message"
        }`}
        >
        {message.text}
        </div>
        
    ))
) : (
    <div className="no-messages">No messages found</div>
    )
):(
    <div className="no-messages">Please sign in to view messages</div>
)}


    <div ref={messagesEndRef}></div> 
</div>
{isTyping && (
    <div className="chat-typing-message">ReX is typing...</div>
)}
{user ? (
    
<div className="chat-input">
    <input
    type="text"
    value={newMessage}
    onChange={(e) => setNewMessage(e.target.value)}
    placeholder="Type a Message to ReX ..."
    />
    <button onClick={handleSendMessage} className="chat-send-btn">
        <img src={SendIcon} alt="Send" className="icon-send" />
    </button>
</div>
):(
    <div className="sign-in-container">
        <button onClick={signInWithGoogle} className="sign-in-btn">Sign In with Google</button>
    </div>
)}
{
fsError && (<div className="error-message">
    FireStore connection error: {fsError}
            </div>            
)}
</div>
);
};

export default Chat;