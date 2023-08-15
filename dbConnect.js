import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
import dbConnect from './dbConnect.js';
const dbConnect = () => {
  mongoose.connect(process.env.DB, { useNewUrlParser: true });
  mongoose.connection.on('connect', () => {
    console.log('connect to database sucessfully');
  });
  mongoose.connection.on('disconnected', () => {
    console.log(`mongodb is disconnected`);
  });
};

export default dbConnect;
