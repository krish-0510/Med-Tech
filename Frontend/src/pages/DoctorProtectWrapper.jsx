import React, { useContext, useEffect, useState } from "react";
import { DoctorDataContext } from "../context/DoctorContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const DoctorProtectWrapper = ({ children }) => {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  const { doctor, setDoctor } = useContext(DoctorDataContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!token) {
      navigate('/doctor/login');
      return;
    }

    const fetchDoctorProfile = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}
/doctors/profile`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (response.status === 200) {
          setDoctor(response.data.doctor);
          setIsLoading(false);
        }
      } catch (err) {
        console.log(err);
        localStorage.removeItem('token');
        navigate('/doctor/login');
      }
    };

    fetchDoctorProfile();
  }, [token, navigate, setDoctor]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
};

export default DoctorProtectWrapper;