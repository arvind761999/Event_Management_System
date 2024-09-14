const nodemailer = require('nodemailer');
const moment = require('moment');
const Event = require('../models/Event');

// Get all events
exports.getAllEvents = async (req, res) => {
    try {
        const events = await Event.find();
        res.json(events);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create a new event
exports.createEvent = async (req, res) => {
    const event = new Event({
        title: req.body.title,
        date: req.body.date,
        reminder: req.body.reminder || false,
    });
    try {
        const newEvent = await event.save();
        res.status(201).json(newEvent);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete an event
exports.deleteEvent = async (req, res) => {
    console.log('****** Deleting event ******');
    try {
        console.log('Delete route called');
        await Event.findByIdAndDelete(req.params.id);
        console.log('Event deleted');
        res.json({ message: 'Event deleted' });
    } catch (error) {
        console.error('Error deleting event:', error);
        res.status(500).json({ message: error.message });
    }
};

// Update an event by ID
exports.updateEvent = async (req, res) => {
    const eventId = req.params.id;
    const { title, date, reminder } = req.body;

    console.log('reminder', reminder);
    try {
        const event = await Event.findById(eventId);
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }

        event.title = title;
        event.date = date;
        event.reminder = reminder;
        console.log('event updated', event.reminder);
        await event.save();

        res.json(event);
    } catch (error) {
        console.error('Error updating event:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};


exports.checkReminders = async () => {
    try {
        console.log('Checking for events that need reminders');
        const today = new Date();
        const events = await Event.find({ reminder: true });

        events.forEach(event => {
            const eventDate = new Date(event.date);
            eventDate.setHours(0, 0, 0, 0); // Ignore time portion
            today.setHours(0, 0, 0, 0); // Ignore time portion
            
            if (eventDate.getTime() === today.getTime()) {
                console.log(`Sending reminder for event: ${event.title}`);
                // Add any logic to send an email/notification reminder here
            }
        });
    } catch (error) {
        console.error('Error checking reminders:', error);
    }


// Configure Nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'your-email@gmail.com', // Replace with your Gmail
    pass: 'your-email-password',  // Replace with your password or app-specific password
  },
});

// Function to send event reminder emails
exports.sendEventReminders = async () => {
  try {
    const upcomingEvents = await Event.find({
      date: {
        $gte: moment().startOf('day').toDate(),
        $lte: moment().endOf('day').toDate(),
      },
      reminder: true,
    });

    upcomingEvents.forEach(event => {
      if (moment(event.date).isBetween(moment(), moment().add(1, 'hours'))) {
        console.log(`Reminder: Your event "${event.title}" is starting soon!`);

        // Send Email Reminder
        const mailOptions = {
          from: 'your-email@gmail.com',
          to: event.organizerEmail,  // Assuming `organizerEmail` is a field in the event schema
          subject: `Reminder: Upcoming Event "${event.title}"`,
          text: `Your event "${event.title}" is scheduled for today. Don't forget to attend!`,
        };

        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.log('Error sending email:', error);
          } else {
            console.log('Email sent:', info.response);
          }
        });
      }
    });
  } catch (error) {
    console.error('Error while checking for upcoming events:', error);
  }
};

};