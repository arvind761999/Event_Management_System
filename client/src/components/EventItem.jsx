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
    <div className="bg-green-100 border border-gray-300 rounded-lg m-2 p-4 w-64 shadow-md hover:shadow-lg">
      <div className="mb-4">
        {isEditing ? (
          <>
            <input
              type="text"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              className="border border-gray-300 rounded p-2 w-full mb-2"
            />
            <input
              type="date"
              value={editedDate}
              onChange={(e) => setEditedDate(e.target.value)}
              className="border border-gray-300 rounded p-2 w-full mb-2"
            />
            <input
              type="time"
              value={editedReminderTime}
              onChange={(e) => setEditedReminderTime(e.target.value)}
              className="border border-gray-300 rounded p-2 w-full"
            />
          </>
        ) : (
          <>
            <h3 className="font-bold text-lg">{event.title}</h3>
            <span className="text-gray-600">
              {/* <span className="font-bold">Event On:</span> {moment(event.date).add(1, 'days').calendar()} */}
              <span className="font-bold">Event On:</span> {moment(event.date).local().format('MMMM Do YYYY')}
            </span>
            {event.reminderTime && (
              <div>
                <span className="font-bold">Reminder Time:</span> {event.reminderTime}
              </div>
            )}
          </>
        )}
      </div>

      <div className="flex justify-between">
        {isEditing ? (
          <>
            <button onClick={handleSaveClick} className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">
              Save
            </button>
            <button onClick={handleCancelClick} className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600">
              Cancel
            </button>
          </>
        ) : (
          <>
            <button onClick={() => onToggleReminder(event._id)} className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600">
              {event.reminder ? 'Disable Reminder' : 'Enable Reminder'}
            </button>
            <button onClick={() => onEventDelete(event._id)} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">
              Delete
            </button>
            <button onClick={handleEditClick} className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">
              Edit
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default EventItem;
