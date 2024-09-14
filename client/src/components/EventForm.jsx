import React, { useState } from 'react';
import axios from 'axios';

const EventForm = ({ onEventAdd }) => {
  const [newEvent, setNewEvent] = useState({
    title: '',
    date: '',
    reminder: false,
    reminderTime: '',
  });

  const handleInputChange = (e) => {
    setNewEvent({ ...newEvent, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post('http://localhost:5000/api/events', newEvent)
      .then(response => {
        onEventAdd(response.data);
        setNewEvent({ title: '', date: '', reminder: false, reminderTime: '' });
      })
      .catch(error => console.error(error));
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center max-w-md w-full p-6 space-y-4 border-2 border-red-500 rounded-lg bg-gradient-to-r from-orange-500 to-red-500 shadow-lg">
      <label className="text-white self-start">Title:</label>
      <input
        type="text"
        name="title"
        value={newEvent.title}
        onChange={handleInputChange}
        required
        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
      />

      <label className="text-white self-start">Date:</label>
      <input
        type="date"
        name="date"
        value={newEvent.date}
        onChange={handleInputChange}
        required
        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
      />

      <label className="text-white self-start">Reminder Time:</label>
      <input
        type="time"
        name="reminderTime"
        value={newEvent.reminderTime}
        onChange={handleInputChange}
        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
      />

      <button type="submit" className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors">
        Add Event
      </button>
    </form>
  );
};

export default EventForm;
