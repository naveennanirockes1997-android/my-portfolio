const dns = require('dns');
dns.setServers(['1.1.1.1', '8.8.8.8']);

require("dotenv").config();
const mongoose = require("mongoose");
const app = require("./app");

const PORT = process.env.PORT || 10000;

mongoose.connect(process.env.MONGO_URI)
.then(() => {
  console.log("MongoDB Connected ✅");
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
})
.catch(err => {
  console.error("MongoDB error:", err);
  process.exit(1);
});