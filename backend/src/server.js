require('dotenv').config();
const app = require('./app');
const port = process.env.PORT || 3000;
const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB error:", err.message);
    process.exit(1);
  });