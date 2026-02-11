require('dotenv').config();
const app = require('./app');
const connectDB = require('./config/db');
const port = process.env.PORT || 3001; // Render will provide PORT

const startServer = async () => {
  try {
    // Ensure DB connection before listening
    await connectDB();
    
    app.listen(port, () => {
      console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${port}`);
    });
  } catch (err) {
    console.error(`Error starting server: ${err.message}`);
    process.exit(1);
  }
};

startServer();