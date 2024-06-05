import React, { useState, useEffect } from 'react';
import ArrowLeftIcon from '../assets/icons/ArrowLeft.svg';
import {Link} from 'react-router-dom';
import { getDocs, collection } from "firebase/firestore";
import { db } from '../firebase'; // Import Firestore instance
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import './styles/ActivityDashboard.css';

const defaultXAxisProps = {
    
    dataKey: 'date',
    tickFormatter: (date) => new Date(date).toLocaleDateString(),
  };
  
  const defaultYAxisProps = {
   
    allowDecimals: false,
  };

const ActivityDashboard = () => {
  const [userActivity, setUserActivity] = useState([]);
  const [filteredActivity, setFilteredActivity] = useState([]);
  const [period, setPeriod] = useState('daily');

  useEffect(() => {
    const fetchUserActivity = async () => {
      const activityCollection = collection(db, 'userActivity');
      const activitySnapshot = await getDocs(activityCollection);
      const activityList = activitySnapshot.docs.map(doc => ({
        date: doc.id,
        hours: doc.data().hours
      }));
      setUserActivity(activityList);
      filterActivity(activityList, period);
    };

    fetchUserActivity();
  }, []);


  useEffect(() => {
    filterActivity(userActivity, period);
  }, [period, userActivity]);

  const filterActivity = (activities, period) => {
    const filtered = activities.filter(activity => {
      const activityDate = new Date(activity.date);
      const today = new Date();
      switch (period) {
        case 'daily':
          return activityDate.toDateString() === today.toDateString();
        case 'weekly':
          const weekAgo = new Date(today);
          weekAgo.setDate(today.getDate() - 7);
          return activityDate >= weekAgo;
        case 'monthly':
          const monthAgo = new Date(today);
          monthAgo.setMonth(today.getMonth() - 1);
          return activityDate >= monthAgo;
        default:
          return true;
      }
    });
    setFilteredActivity(filtered);
  };



  return (
    <div className="activity-dashboard">
      <div className="header">
      <Link to="/"><img src={ArrowLeftIcon} alt="Arrow" className="chat-arrow" /></Link>
        <h2>Activity</h2>
      </div>
      <div className="statistics">
        <h3>Your Statistics</h3>
        <p>Graph of the time you spent with ReX this week.</p>
        <div className="period-selector">
        <select onChange={(e) => setPeriod(e.target.value)} value={period}>
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
          </select>
        </div>
        <div className="chart">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={userActivity}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis {...defaultXAxisProps} />
              <YAxis {...defaultYAxisProps} />
              <Tooltip />
              <Bar dataKey="hours" fill="#8884d8"  />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="details">
        <h3>Details Chat Activity</h3>
        <ul>
          {filteredActivity.map((activity, index) => (
            <li key={index} className="activity-item">
              <div className="activity-time">{activity.date}</div>
              <div className="activity-duration">{activity.hours} hours</div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ActivityDashboard;
