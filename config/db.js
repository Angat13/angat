const mongoose = require('mongoose');
require('dotenv').config(); // Load environment variables

const mongodbURL = process.env.MONGODB_URL;

if (!mongodbURL) {
    console.error('Error: MONGODB_URL is not defined in the .env file.');
    process.exit(1); // Exit the process with failure
}

mongoose.connect(mongodbURL);

const db = mongoose.connection;

db.on('connected', () => {
    console.log('MongoDB connected successfully');
});

db.on('disconnected', () => {
    console.log('MongoDB disconnected');
});

db.on('error', (error) => {
    console.error('MongoDB connection error:', error);
});

module.exports = db
