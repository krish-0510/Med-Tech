import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaHome, FaUser, FaEnvelope, FaCalendarAlt, FaSignOutAlt } from 'react-icons/fa';

const Navbar = ({ doctor: propDoctor }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [doctor, setDoctor] = useState(propDoctor);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDoctor = async () => {
      if (!propDoctor) {
        try {
          const token = localStorage.getItem('token');
          const response = await axios.get(`${import.meta.env.VITE_BASE_URL}
/doctors/profile`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          setDoctor(response.data.doctor);
        } catch (error) {
          console.error('Error fetching doctor profile:', error);
        }
      }
    };

    fetchDoctor();
  }, [propDoctor]);

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
        {doctor && !isCollapsed && (
          <div>
            <h2 className="text-xl font-bold">{doctor.fullname.firstname} {doctor.fullname.lastname}</h2>
            <p>{doctor.email}</p>
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
            <Link to="/doctor" className="text-white">Home</Link>
          </li>
          <li className="mb-2 flex items-center">
            <FaUser className="mr-2" />
            <Link to="/doctor/patients" className="text-white">Patients</Link>
          </li>
          <li className="mb-2 flex items-center">
            <FaEnvelope className="mr-2" />
            <Link to="/doctor/messages" className="text-white">Messages</Link>
          </li>
          <li className="mb-2 flex items-center">
            <FaCalendarAlt className="mr-2" />
            <Link to="/doctor/appointments" className="text-white">Appointments</Link>
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

export default Navbar;