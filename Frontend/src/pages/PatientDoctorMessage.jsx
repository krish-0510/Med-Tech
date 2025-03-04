import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import UserNavbar from '../components/UserNavbar';
import PatientMessageList from '../components/PatientMessageList';
import MessageInput from '../components/MessageInput';

const PatientDoctorMessage = () => {
  const { doctorId } = useParams();
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}
/messages/conversation-with-doctor/${doctorId}`, {
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
  }, [doctorId]);

  const sendMessage = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}
/messages/send`, {
        receiverId: doctorId,
        receiverModel: 'Doctor',
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
      <UserNavbar />
      <div className="flex-grow p-8 ml-64">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">Messages with Doctor</h2>
          <PatientMessageList messages={messages} doctorId={doctorId} />
          <MessageInput message={message} setMessage={setMessage} sendMessage={sendMessage} />
        </div>
      </div>
    </div>
  );
};

export default PatientDoctorMessage;