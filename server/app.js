const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();
const bodyParser = require('body-parser');
const connectDb = require('./db/connectDb')
const cron = require('node-cron');


app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
connectDb();

// Routes
const newsRoutes = require('./routes/eventRoutes');
app.use('/api/events', newsRoutes);

// Schedule a cron job to run every day at midnight
cron.schedule('0 0 * * *', async () => {
    await checkReminders(); // Call the reminder function from the controller
});


module.exports = app;
