import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';

const PatientReports = () => {
  const { patientId } = useParams();
  const [reports, setReports] = useState([]);
  const [feedback, setFeedback] = useState('');
  const [selectedReportId, setSelectedReportId] = useState(null);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}
/medical-reports/progress/${patientId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setReports(response.data);
      } catch (error) {
        console.error('Error fetching reports:', error);
      }
    };

    fetchReports();
  }, [patientId]);

  const handleFeedbackSubmit = async (reportId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}
/medical-reports/feedback/${reportId}`, {
        feedback
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setReports(reports.map(report => report._id === reportId ? response.data : report));
      setFeedback('');
      setSelectedReportId(null);
    } catch (error) {
      console.error('Error sending feedback:', error);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Navbar />
      <div className="flex-grow p-8 ml-64">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">Patient Reports</h2>
          {reports.length > 0 ? (
            <ul className="space-y-4">
              {reports.map((report) => (
                <li key={report._id} className="border border-gray-300 p-6 rounded-lg bg-white shadow-md">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-2xl font-semibold text-gray-800">Report Details</h3>
                    <span className="text-sm text-gray-600">{new Date(report.createdAt).toLocaleString()}</span>
                  </div>
                  <div className="space-y-2">
                    <p className="text-lg text-gray-800"><strong>Report:</strong> {report.report}</p>
                    <p className="text-lg text-gray-800"><strong>Progress:</strong> {report.progress}</p>
                    <p className="text-lg text-gray-800"><strong>Feedback:</strong> {report.feedback}</p>
                  </div>
                  <button
                    className="mt-4 bg-blue-500 text-white p-2 rounded"
                    onClick={() => setSelectedReportId(report._id)}
                  >
                    Add Feedback
                  </button>
                  {selectedReportId === report._id && (
                    <div className="mt-4">
                      <textarea
                        value={feedback}
                        onChange={(e) => setFeedback(e.target.value)}
                        className="border p-2 w-full"
                        placeholder="Enter your feedback"
                      />
                      <button
                        onClick={() => handleFeedbackSubmit(report._id)}
                        className="bg-green-500 text-white p-2 mt-2 rounded"
                      >
                        Submit Feedback
                      </button>
                    </div>
                  )}
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

export default PatientReports;