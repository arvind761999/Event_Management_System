const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');

// Get all events
router.get('/', eventController.getAllEvents);

// Create a new event
router.post('/', eventController.createEvent);

// Delete an event by ID
router.delete('/:id', eventController.deleteEvent);

// Update an event by ID
router.put('/:id', eventController.updateEvent);

// router.get('/reminders', eventController.sendEventReminders);

module.exports = router;
