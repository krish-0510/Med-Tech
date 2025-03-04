import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import UserNavbar from '../components/UserNavbar';

const DoctorsList = () => {
  const [doctors, setDoctors] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}
/doctors/all`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setDoctors(response.data);
      } catch (error) {
        console.error('Error fetching doctors:', error);
      }
    };

    fetchDoctors();
  }, []);

  const handleDoctorClick = (doctorId) => {
    navigate(`/user/messages/${doctorId}`);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <UserNavbar />
      <div className="flex-grow p-8 ml-64">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">Doctors List</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {doctors.length > 0 ? (
              doctors.map((doctor) => (
                <div
                  key={doctor._id}
                  className="bg-white p-6 rounded-lg shadow-lg cursor-pointer hover:bg-gray-50 transition duration-200"
                  onClick={() => handleDoctorClick(doctor._id)}
                >
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    {doctor.fullname.firstname} {doctor.fullname.lastname}
                  </h3>
                  <p className="text-gray-600"><strong>Email:</strong> {doctor.email}</p>
                  <p className="text-blue-500 mt-2">Click to view messages</p>
                </div>
              ))
            ) : (
              <p className="text-center col-span-full">No doctors found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorsList;