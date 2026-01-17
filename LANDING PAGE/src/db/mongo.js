const mongoose = require('mongoose');

let isConnected = false;

async function connectMongo(mongoUri) {
  if (!mongoUri) {
    throw new Error('MONGODB_URI is missing. Add it to your .env file.');
  }

  if (isConnected) return;

  mongoose.set('strictQuery', true);

  mongoose.connection.on('connected', () => {
    console.log('MongoDB connected');
  });

  mongoose.connection.on('error', (err) => {
    console.error('MongoDB connection error:', err);
  });

  console.log('Connecting to MongoDB...');

  await mongoose.connect(mongoUri, {
    autoIndex: true,
    serverSelectionTimeoutMS: 5000
  });

  isConnected = true;
}

module.exports = { connectMongo };
