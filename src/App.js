import React from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Home from './pages/Home';
import HelloWorld from './pages/HelloWorld';
import WelcomeScreen from './pages/WelcomeScreen';
import ActivityDashboard from './pages/ActivityDashboard';
import Chat from './pages/Chat';

import './App.css';

function App() {
  return (
   <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route  path="/hello-world" element={<HelloWorld />} /> {/* added route to helloworld for testing api */}
      <Route path="/welcome" element={<WelcomeScreen />} />
      <Route path="/chat" element={<Chat />} />
      <Route path="/activity" element={<ActivityDashboard />} />
      
    </Routes>
   </Router>
  );
}








export default App;
