import React from 'react';
import Header from '../components/Header';
import Button from '../components/Button';
import AvatarImage from '../assets/images/Group.png';
import { useNavigate } from 'react-router-dom';
import '../pages/styles/WelcomeScreen.css';
const WelcomeScreen = () => {
  const navigate = useNavigate();
  const handleStartChat = () => {
    navigate('/chat');
  };

  return (
    <div className='welcome-screen'>
     <Header />
     <div className='welcome-content'>
     <div className='welcome-avatar-container'>
     <img className='welcome-avatar' src={AvatarImage} alt='Avatar' />
     </div>
     <h1> Welcome, Michael! 👋🏾</h1>

     <p> Receive Career Help from ReX!</p>
     <p>Start a conversation with ReX right now!</p>

    <Button onClick={handleStartChat} text="Start Chat with ReX" />
    </div>
    </div>
  );
};

export default WelcomeScreen;