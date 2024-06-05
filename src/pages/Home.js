import React from 'react';
import { Link } from 'react-router-dom';
import WelcomeScreen from './WelcomeScreen';
import '../pages/styles/Home.css';
const Home = () => {
    return (
        <div className='home'>
        <h1>Cosmo Chat UI Bot</h1>
        <Link to="/hello-world">Go to Hello World</Link>
        <WelcomeScreen />
        </div>
        );
};

export default Home;

