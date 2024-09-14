import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EventForm from '../components/EventForm';
import EventList from '../components/EventList';

const Home = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // Fetch events from the server
    axios.get('http://localhost:5000/api/events')
      .then(response => setEvents(response.data))
      .catch(error => console.error(error));
  }, []);

  const handleEventAdd = (newEvent) => {
    setEvents([...events, newEvent]);
  };

  const handleEventDelete = (id) => {
    // Delete an event
    axios.delete(`http://localhost:5000/api/events/${id}`)
      .then(() => setEvents(events.filter(event => event._id !== id)))
      .catch(error => console.error(error));
  };

  const handleToggleReminder = (eventId) => {
    const selectedEvent = events.find(event => event._id === eventId);

    const updatedEvent = {
      ...selectedEvent,
      reminder: !selectedEvent.reminder
    };

    axios.put(`http://localhost:5000/api/events/${eventId}`, updatedEvent)
      .then(response => {
        const updatedEvents = events.map(event =>
          event._id === eventId ? updatedEvent : event
        );
        setEvents(updatedEvents);
      })
      .catch(error => console.error(`Error updating reminder status for event with ID ${eventId}:`, error));
  };

  const handleEventEdit = (eventId, updatedData) => {
    axios.put(`http://localhost:5000/api/events/${eventId}`, updatedData)
      .then(response => {
        const updatedEvents = events.map(event =>
          event._id === eventId ? { ...event, ...updatedData } : event
        );
        setEvents(updatedEvents);
      })
      .catch(error => console.error(`Error updating event with ID ${eventId}:`, error));
  };

  return (
    <div className='flex flex-col items-center p-6 bg-gray-600'>
      <h1 className='text-2xl w-full font-bold text-white bg-green-600 rounded-lg p-4 mb-6 text-center'>
        Event Management App
      </h1>
      <EventForm onEventAdd={handleEventAdd} />
      <EventList
        events={events}
        onEventDelete={handleEventDelete}
        onToggleReminder={handleToggleReminder}
        onEventEdit={handleEventEdit}
      />
    </div>
  );
};

export default Home;
