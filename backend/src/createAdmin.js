require('dotenv').config();
const mongoose = require('mongoose');
const Admin = require('./models/Admin');
const connectDB = require('./config/db');

const createAdmin = async () => {
  try {
    await connectDB();
    console.log('Database connected, checking for existing admin...');
    const existing = await Admin.findOne({ username: 'admin' });
    if (existing) {
      console.log('Admin already exists. Deleting and recreating for clean slate...');
      await Admin.deleteOne({ username: 'admin' });
    }
    
    console.log('Creating admin "admin" with password "password123"...');
    const newAdmin = new Admin({
      username: 'admin',
      password: 'password123'
    });
    await newAdmin.save();
    console.log('SUCCESS: Admin created successfully!');
    process.exit(0);
  } catch (err) {
    console.error('CRITICAL ERROR during admin creation:');
    console.error(err);
    process.exit(1);
  }
};

createAdmin();
