import React, { useEffect, useState } from 'react';
import axios from 'axios';
import UserNavbar from '../components/UserNavbar';
import { FaClipboardList, FaCheckCircle, FaComments } from 'react-icons/fa';

const ProgressReport = () => {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}
/medical-reports/progress`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setReports(response.data);
      } catch (error) {
        console.error('Error fetching progress reports:', error);
      }
    };

    fetchReports();
  }, []);

  return (
    <div className="flex min-h-screen bg-gradient-to-r from-blue-100 to-blue-200">
      <UserNavbar />
      <div className="flex-grow p-8">
        <div className="w-full max-w-4xl p-8 space-y-6 bg-white rounded-lg shadow-lg mx-auto">
          <h2 className="text-4xl font-bold text-center text-blue-900 mb-6">Progress Reports</h2>
          {reports.length > 0 ? (
            <ul className="space-y-4">
              {reports.map((report, index) => (
                <li key={report._id} className="border border-gray-300 p-6 rounded-lg bg-blue-50 shadow-md">
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl font-semibold text-gray-800">{index + 1}.</span>
                      <h3 className="text-2xl font-semibold text-gray-800">Report Details</h3>
                    </div>
                    <span className="text-sm text-gray-600">{new Date(report.createdAt).toLocaleString()}</span>
                  </div>
                  <div className="space-y-2">
                    <p className="text-lg text-gray-800 flex items-center"><FaClipboardList className="mr-2 text-blue-500" /><strong>Report:</strong> {report.report}</p>
                    <p className="text-lg text-gray-800 flex items-center"><FaCheckCircle className="mr-2 text-green-500" /><strong>Progress:</strong> {report.progress}</p>
                    <p className="text-lg text-gray-800 flex items-center"><FaComments className="mr-2 text-yellow-500" /><strong>Feedback:</strong> {report.feedback}</p>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-center text-gray-700">No reports found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProgressReport;