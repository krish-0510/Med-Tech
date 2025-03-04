import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const DoctorSignup = () => {
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    specialty: '',
    licenseNumber: '',
    phoneNumber: ''
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/doctors/register`, {
        fullname: {
          firstname: formData.firstname,
          lastname: formData.lastname
        },
        email: formData.email,
        password: formData.password,
        specialty: formData.specialty,
        licenseNumber: formData.licenseNumber,
        phoneNumber: formData.phoneNumber
      });
      // console.log(response.data);
      localStorage.setItem('token', response.data.token);
      navigate('/doctor');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-500">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg transform transition duration-500 hover:scale-105">
        <h2 className="text-3xl font-bold text-center text-gray-900">Doctor Signup</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="firstname" className="block text-sm font-medium text-gray-700">First Name</label>
            <input
              type="text"
              name="firstname"
              id="firstname"
              placeholder="First Name"
              onChange={handleChange}
              required
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300"
            />
          </div>
          <div>
            <label htmlFor="lastname" className="block text-sm font-medium text-gray-700">Last Name</label>
            <input
              type="text"
              name="lastname"
              id="lastname"
              placeholder="Last Name"
              onChange={handleChange}
              required
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Email"
              onChange={handleChange}
              required
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              onChange={handleChange}
              required
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300"
            />
          </div>
          <div>
            <label htmlFor="specialty" className="block text-sm font-medium text-gray-700">Specialty</label>
            <input
              type="text"
              name="specialty"
              id="specialty"
              placeholder="Specialty"
              onChange={handleChange}
              required
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300"
            />
          </div>
          <div>
            <label htmlFor="licenseNumber" className="block text-sm font-medium text-gray-700">License Number</label>
            <input
              type="text"
              name="licenseNumber"
              id="licenseNumber"
              placeholder="License Number"
              onChange={handleChange}
              required
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300"
            />
          </div>
          <div>
            <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">Phone Number</label>
            <input
              type="text"
              name="phoneNumber"
              id="phoneNumber"
              placeholder="Phone Number"
              onChange={handleChange}
              required
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300"
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-300"
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DoctorSignup;