import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';

const DoctorHomePage = () => {
  const [doctor, setDoctor] = useState(null);

  useEffect(() => {
    const fetchDoctorProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const response = await axios.get(`${import.meta.env.VITE_BASE_URL}
/doctors/profile`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          setDoctor(response.data.doctor);
        }
      } catch (error) {
        console.error('Error fetching doctor profile:', error);
      }
    };

    fetchDoctorProfile();
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-100" style={{ backgroundImage: "url('https://www.shutterstock.com/image-photo/medicine-healthcare-people-concept-female-600w-2188588635.jpg')", backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <Navbar doctor={doctor} />
      <div className="flex-grow p-8 ml-64 bg-white bg-opacity-90 shadow-lg rounded-lg m-8">
        {doctor ? (
          <>
            <div className="flex items-center mb-8">
              <img
                src={`https://img.freepik.com/free-photo/portrait-white-man-isolated_53876-40306.jpg?t=st=1740808343~exp=1740811943~hmac=fb9306640f63af050ff72a3c21b450e6ef0b0137ef7f51362a48cc3eb2bcfb91&w=1380`}
                alt={`${doctor.fullname.firstname} ${doctor.fullname.lastname}`}
                className="w-24 h-24 rounded-full mr-4"
              />
              <div className="ml-6">
                <h1 className="text-4xl font-bold text-gray-800" style={{ fontFamily: 'Georgia, serif', textShadow: '1px 1px 2px rgba(0, 0, 0, 0.2)' }}>{doctor.fullname.firstname} {doctor.fullname.lastname}</h1>
                <p className="text-xl text-gray-600" style={{ fontFamily: 'Arial, sans-serif', fontStyle: 'italic' }}>{doctor.email}</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-blue-50 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                <h2 className="text-2xl font-semibold text-gray-700 mb-4" style={{ fontFamily: 'Verdana, sans-serif', textDecoration: 'underline' }}>Professional Details</h2>
                <p className="text-lg text-gray-700" style={{ fontFamily: 'Tahoma, sans-serif' }}><strong>Specialty:</strong> {doctor.specialty}</p>
                <p className="text-lg text-gray-700" style={{ fontFamily: 'Tahoma, sans-serif' }}><strong>License Number:</strong> {doctor.licenseNumber}</p>
                <p className="text-lg text-gray-700" style={{ fontFamily: 'Tahoma, sans-serif' }}><strong>Phone Number:</strong> {doctor.phoneNumber}</p>
              </div>
              <div className="bg-blue-50 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                <h2 className="text-2xl font-semibold text-gray-700 mb-4" style={{ fontFamily: 'Verdana, sans-serif', textDecoration: 'underline' }}>Professional Background</h2>
                <p className="text-lg text-gray-700" style={{ fontFamily: 'Tahoma, sans-serif' }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet.</p>
              </div>
            </div>
          </>
        ) : (
          <p className="text-center text-xl text-gray-700">Loading...</p>
        )}
      </div>
    </div>
  );
};

export default DoctorHomePage;