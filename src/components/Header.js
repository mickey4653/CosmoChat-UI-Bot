import React from "react";
import SettingsIcon from '../assets/icons/Setting.svg';
import ActivityIcon from '../assets/icons/Activity.svg';
import ImageIcon from '../assets/images/Logo.svg';
import { useNavigate } from 'react-router-dom';
import "../components/styles/Header.css";
const Header = () => {
  const navigate = useNavigate();
  const handleActivity = () => {
    navigate('/activity');
  };

  return (
    <div className="header">
      <div className="header-left">
        <img src={ImageIcon} alt="Avatar" className="header-avatar" />
        <span className="header-title">ReX</span>
      </div>

      <div className="header-right">
      <img src={SettingsIcon} alt="Settings" className="icon-settings" />
      <img onClick={handleActivity} src={ActivityIcon} alt="Activity"  className="icon-activity"/>
      </div>
    </div>
  );
};
export default Header;
