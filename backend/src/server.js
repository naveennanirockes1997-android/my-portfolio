const dns = require('dns');
dns.setServers(['1.1.1.1', '8.8.8.8']);

require("dotenv").config();
const mongoose = require("mongoose");
const app = require("./app");

const Admin = require("./models/Admin");
const Project = require("./models/Project");
const Skill = require("./models/Skill");
const Experience = require("./models/Experience");
const Certification = require("./models/Certification");
const seedData = require("./seed");

const PORT = process.env.PORT || 10000;

mongoose.connect(process.env.MONGO_URI)
.then(async () => {
  console.log("MongoDB Connected ✅");
  
  // Auto-seed database collections on startup if they are empty
  try {
    // 1. Admin
    const adminCount = await Admin.countDocuments();
    if (adminCount === 0) {
      const defaultEmail = process.env.ADMIN_EMAIL || process.env.EMAIL_USER || "admin@example.com";
      await Admin.create({
        username: "admin",
        email: defaultEmail,
        password: "password123"
      });
      console.log(`Auto-created default admin user: admin / ${defaultEmail} / password123`);
    }

    // 2. Projects
    const projectCount = await Project.countDocuments();
    if (projectCount === 0 && seedData.projects) {
      await Project.insertMany(seedData.projects);
      console.log("Auto-seeded projects collection");
    }

    // 3. Skills
    const skillCount = await Skill.countDocuments();
    if (skillCount === 0 && seedData.skills) {
      await Skill.insertMany(seedData.skills);
      console.log("Auto-seeded skills collection");
    }

    // 4. Experiences
    const experienceCount = await Experience.countDocuments();
    if (experienceCount === 0 && seedData.experiences) {
      await Experience.insertMany(seedData.experiences);
      console.log("Auto-seeded experiences collection");
    }

    // 5. Certifications
    const certificationCount = await Certification.countDocuments();
    if (certificationCount === 0 && seedData.certifications) {
      await Certification.insertMany(seedData.certifications);
      console.log("Auto-seeded certifications collection");
    }
  } catch (seedErr) {
    console.error("Error auto-seeding database collections on startup:", seedErr);
  }

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
})
.catch(err => {
  console.error("MongoDB error:", err);
  process.exit(1);
});