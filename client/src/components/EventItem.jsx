import React, { useState } from 'react';
import moment from 'moment';

const EventItem = ({ event, onEventDelete, onToggleReminder, onEventEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(event.title);
  const [editedDate, setEditedDate] = useState(moment(event.date).format('YYYY-MM-DD'));
  const [editedReminderTime, setEditedReminderTime] = useState(event.reminderTime || '');

  const handleEditClick = () => setIsEditing(true);

  const handleSaveClick = () => {
    onEventEdit(event._id, { title: editedTitle, date: editedDate, reminderTime: editedReminderTime });
    setIsEditing(false);
  };

  const handleCancelClick = () => {
    setEditedTitle(event.title);
    setEditedDate(moment(event.date).format('YYYY-MM-DD'));
    setEditedReminderTime(event.reminderTime || '');
    setIsEditing(false);
  };

  return (
    <div className="w-full max-w-sm p-4 bg-white border rounded-lg shadow-lg hover:shadow-xl space-y-4">
      <div>
        {isEditing ? (
          <>
            <input
              type="text"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md mb-2 focus:outline-none"
            />
            <input
              type="date"
              value={editedDate}
              onChange={(e) => setEditedDate(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md mb-2 focus:outline-none"
            />
            <input
              type="time"
              value={editedReminderTime}
              onChange={(e) => setEditedReminderTime(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none"
            />
          </>
        ) : (
          <>
            <h3 className="font-bold text-lg">{event.title}</h3>
            <p className="text-gray-600">
              <span className="font-bold">Event On:</span> {moment(event.date).local().format('MMMM Do YYYY')}
            </p>
            {event.reminderTime && (
              <p>
                <span className="font-bold">Reminder Time:</span> {event.reminderTime}
              </p>
            )}
          </>
        )}
      </div>

      <div className="flex justify-between space-x-2">
        {isEditing ? (
          <>
            <button onClick={handleSaveClick} className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600">
              Save
            </button>
            <button onClick={handleCancelClick} className="w-full py-2 px-4 bg-gray-500 text-white rounded-md hover:bg-gray-600">
              Cancel
            </button>
          </>
        ) : (
          <>
            <button onClick={() => onToggleReminder(event._id)} className="w-full py-2 px-4 bg-yellow-500 text-white rounded-md hover:bg-yellow-600">
              {event.reminder ? 'Disable Reminder' : 'Enable Reminder'}
            </button>
            <button onClick={() => onEventDelete(event._id)} className="w-full py-2 px-4 bg-red-500 text-white rounded-md hover:bg-red-600">
              Delete
            </button>
            <button onClick={handleEditClick} className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600">
              Edit
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default EventItem;
