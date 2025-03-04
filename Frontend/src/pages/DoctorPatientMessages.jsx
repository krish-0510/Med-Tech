import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import DoctorMessageList from '../components/DoctorMessageList';
import MessageInput from '../components/MessageInput';
import { DoctorDataContext } from '../context/DoctorContext';

const DoctorPatientMessages = () => {
  const { patientId } = useParams();
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const { doctor } = useContext(DoctorDataContext);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}
/messages/conversation/${patientId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setMessages(response.data);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    fetchMessages();
  }, [patientId]);

  const sendMessage = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}
/messages/send-message-from-doctor-to-patient`, {
        receiverId: patientId,
        content: message
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setMessages([...messages, response.data]);
      setMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Navbar />
      <div className="flex-grow p-8 ml-64">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">Messages</h2>
          {doctor && <DoctorMessageList messages={messages} doctorId={doctor._id} />}
          <MessageInput message={message} setMessage={setMessage} sendMessage={sendMessage} />
        </div>
      </div>
    </div>
  );
};

export default DoctorPatientMessages;