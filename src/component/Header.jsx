import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser } from "react-icons/fa";
import logo from "../Image/logo.png";
import { MenuListArray2 } from '.';

const Headers = () => {
  const isAuthenticate = localStorage.getItem('auth-token');
  const userEmail = localStorage.getItem('email');
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('auth-token');
    localStorage.removeItem("email");
    navigate('/logins');
  };

  const handleLogin = () => {
    navigate("/logins");
  };

  return (
    <header 
      className={`w-full h-[4.5rem] flex items-center justify-between px-4 ${isHovered ? 'bg-blue-500 text-white' : 'bg-white text-black'} font-bold transition-all duration-300`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div id="logo" className="flex items-center">
        <Link to="/">
          <img src={logo} alt="logo" className='w-10' />
        </Link>
        <span className="text-2xl font-bold ml-3">LoanVision</span>
      </div>

      {/* Navigation Links */}
      <ul className="flex gap-10 items-center">
        {MenuListArray2.map((data, index) => (
          <li key={index}>
            <Link to={data.to} className="hover:no-underline text-lg">{data.title}</Link>
          </li>
        ))}
        {isAuthenticate ? 
          <li onClick={handleLogout} className="cursor-pointer text-lg">Logout</li> 
          : <li className='cursor-pointer text-lg' onClick={handleLogin}>Login</li>
        }
        {isAuthenticate ? <li className='flex items-center gap-3 text-lg'><FaUser /> {userEmail}</li> : null}
      </ul>
    </header>
  );
};

export default Headers;
