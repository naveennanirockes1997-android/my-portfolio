require('dotenv').config();
const app = require('./app');
const port = process.env.PORT || 3000;

const connectDB = require('./config/db');

// Connect to Database
connectDB();

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
