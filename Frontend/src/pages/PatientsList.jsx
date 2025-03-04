import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const PatientsList = () => {
  const [patients, setPatients] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}
/doctors/patients`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setPatients(response.data);
      } catch (error) {
        console.error('Error fetching patients:', error);
      }
    };

    fetchPatients();
  }, []);

  const handlePatientClick = (patientId) => {
    navigate(`/doctor/patients/${patientId}/reports`);
  };

  return (
    <div className="flex min-h-screen bg-gray-100" style={{ backgroundImage: "url('https://media.istockphoto.com/id/1159847028/photo/medical-stethoscope-isolated-on-white-background.jpg?s=612x612&w=0&k=20&c=pWg7zs2AZmeSvdjnWRxlx5Y0wwgnGMpJlOQi065D6mM=')", backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <Navbar />
      <div className="flex-grow p-8 ml-64  bg-opacity-90 shadow-lg rounded-lg m-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-8">Patients List</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {patients.length > 0 ? (
              patients.map((patient) => (
                <div
                  key={patient._id}
                  className="bg-white p-6 rounded-lg shadow-lg cursor-pointer hover:bg-blue-50 transition duration-200 relative"
                  onClick={() => handlePatientClick(patient._id)}
                  style={{ backgroundImage: "url('https://img.icons8.com/ios-filled/50/000000/user.png')", backgroundRepeat: 'no-repeat', backgroundPosition: 'right bottom', backgroundSize: '50px' }}
                >
                  <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                    {patient.fullname.firstname} {patient.fullname.lastname}
                  </h3>
                  <p className="text-gray-600"><strong>Email:</strong> {patient.email}</p>
                  <p className="text-blue-500 mt-2">Click to view progress report</p>
                </div>
              ))
            ) : (
              <p className="text-center col-span-full text-xl text-gray-700">No patients found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientsList;