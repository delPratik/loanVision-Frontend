import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from "../Image/logo.png";

const Headers = ({ isAdmin }) => {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    navigate('/adminlogin');
  };

  return (
    <header
      className={`w-full h-[4.5rem] flex items-center px-4 font-bold transition-all duration-300 ${isHovered ? 'bg-blue-500 text-white' : 'bg-white text-black'}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Logo and "LoanVision" Text */}
      <div id="logo" className="flex items-center">
        <Link to="/dashboard">
          <img src={logo} alt="Logo" className="w-10 hover:w-12 transition-all duration-300" />
        </Link>
        <span className="text-2xl font-bold ml-3">LoanVision</span>
      </div>

      {/* Conditional Display */}
      <div className="ml-auto flex gap-4">
        {isAdmin ? (
          <Link
            to="/adminlogin"
            onClick={handleLogout}
            className={`text-lg font-semibold ${isHovered ? 'text-white' : 'text-black'} transition-colors duration-300`}
          >
            Logout
          </Link>
        ) : null}
      </div>
    </header>
  );
};

export default Headers;
