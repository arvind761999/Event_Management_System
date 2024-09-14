import React, { useState } from 'react';
import axios from 'axios';

const EventForm = ({ onEventAdd }) => {
  const [newEvent, setNewEvent] = useState({
    title: '',
    date: '',
    reminder: false,
    reminderTime: '',
    organizerEmail: ''
  });

  const handleInputChange = (e) => {
    setNewEvent({ ...newEvent, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post('http://localhost:5000/api/events', newEvent)
      .then(response => {
        onEventAdd(response.data);
        setNewEvent({ title: '', date: '', reminder: false, reminderTime: '' , organizerEmail: ''});
      })
      .catch(error => console.error(error));
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center border-2 border-red-500 p-4 rounded-lg bg-gradient-to-r from-orange-500 to-red-500">
      <label className="text-white mb-2">Title:</label>
      <input
        type="text"
        name="title"
        value={newEvent.title}
        onChange={handleInputChange}
        required
        className="border border-gray-300 rounded p-2 mb-2 w-80"
      />

      <label className="text-white mb-2">Date:</label>
      <input
        type="date"
        name="date"
        value={newEvent.date}
        onChange={handleInputChange}
        required
        className="border border-gray-300 rounded p-2 mb-4 w-80"
      />

      <label className="text-white mb-2">Reminder Time </label>
      <input
        type="time"
        name="reminderTime"
        value={newEvent.reminderTime}
        onChange={handleInputChange}
        className="border border-gray-300 rounded p-2 mb-4 w-80"
      />

      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
        Add Event
      </button>
    </form>
  );
};

export default EventForm;
