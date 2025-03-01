import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import UserNavbar from '../components/UserNavbar';

const UploadReport = () => {
  const [report, setReport] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setReport(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('http://localhost:4000/medical-reports/upload', { report }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log(response.data);
      navigate('/user'); // Redirect to user homepage after successful submission
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <UserNavbar />
      <div className="flex-grow p-8 ml-64"> {/* Added ml-64 */}
        <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold text-center text-gray-900">Upload Medical Report</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="report" className="block text-sm font-medium text-gray-700">Report</label>
              <textarea
                name="report"
                id="report"
                placeholder="Enter your medical report"
                onChange={handleChange}
                required
                className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm"
              />
            </div>
            <div>
              <button
                type="submit"
                className="w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
              >
                Upload
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UploadReport;