import React, { useEffect, useState } from 'react';
import axios from 'axios';
import UserNavbar from '../components/UserNavbar';

const UserHomePage = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const response = await axios.get(`${import.meta.env.VITE_BASE_URL}
/users/profile`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          setUser(response.data);
        }
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    fetchUserProfile();
  }, []);

  return (
    <div className="flex min-h-screen bg-gradient-to-r from-blue-100 to-blue-200">
      <UserNavbar user={user} />
      <div className="flex-grow p-8 ml-64 bg-white shadow-lg rounded-lg m-8"> {/* Added ml-64 */}
        {user ? (
          <>
            <div className="flex items-center mb-8">
              <img
                className="w-24 h-24 rounded-full"
                src={`https://thumbs.dreamstime.com/z/young-male-teenage-patient-hospital-gown-isolated-white-background-185244366.jpg`}
                alt="Profile"
              />
              <div className="ml-6">
                <h1 className="text-3xl font-bold text-gray-800">{user.fullname.firstname} {user.fullname.lastname}</h1>
                <p className="text-gray-600">{user.email}</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-blue-50 p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold text-gray-700 mb-4">Personal Details</h2>
                <p className="text-gray-700"><strong>Email:</strong> {user.email}</p>
                <p className="text-gray-700"><strong>Phone:</strong> {user.phone}</p>
                <p className="text-gray-700"><strong>Address:</strong> {user.address}</p>
              </div>
              <div className="bg-blue-50 p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold text-gray-700 mb-4">Medical Details</h2>
                <p className="text-gray-700"><strong>Blood Group:</strong> {user.bloodGroup}</p>
                <p className="text-gray-700"><strong>Allergies:</strong> {user.allergies}</p>
                <p className="text-gray-700"><strong>Medical History:</strong> {user.medicalHistory}</p>
              </div>
            </div>
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default UserHomePage;