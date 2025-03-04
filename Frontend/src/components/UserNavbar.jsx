import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaHome, FaUpload, FaChartLine, FaEnvelope, FaSignOutAlt } from 'react-icons/fa';

const UserNavbar = ({ user: propUser }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [user, setUser] = useState(propUser);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      if (!propUser) {
        try {
          const token = localStorage.getItem('token');
          const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/users/profile`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          setUser(response.data);
        } catch (error) {
          console.error('Error fetching user profile:', error);
        }
      }
    };

    fetchUser();
  }, [propUser]);

  const toggleNavbar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <div className={`h-screen bg-gray-800 text-white flex flex-col ${isCollapsed ? 'w-20' : 'w-64'} transition-width duration-300 fixed`}>
      <div className="p-4 flex justify-between items-center">
        {user && !isCollapsed && (
          <div>
            <h2 className="text-xl font-bold">{user.fullname.firstname} {user.fullname.lastname}</h2>
            <p>{user.email}</p>
          </div>
        )}
        <button onClick={toggleNavbar} className="text-white">
          {isCollapsed ? '>' : '<'}
        </button>
      </div>
      <nav className="flex-grow p-4">
        <ul>
          <li className="mb-2 flex items-center">
            <FaHome className="mr-2" />
            <Link to="/user" className="text-white">Home</Link>
          </li>
          <li className="mb-2 flex items-center">
            <FaUpload className="mr-2" />
            <Link to="/upload-report" className="text-white">Upload Report</Link>
          </li>
          <li className="mb-2 flex items-center">
            <FaChartLine className="mr-2" />
            <Link to="/progress-report" className="text-white">Progress Report</Link>
          </li>
          <li className="mb-2 flex items-center">
            <FaEnvelope className="mr-2" />
            <Link to="/user/doctors" className="text-white">Messages</Link>
          </li>
          <li className="mb-2 flex items-center">
            <FaSignOutAlt className="mr-2" />
            <button onClick={handleLogout} className="text-white">Logout</button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default UserNavbar;