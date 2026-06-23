const mongoose = require("mongoose");
const dotenv = require("dotenv");

const Project = require("./models/Project");
const Internship = require("./models/Internship");

const projects = require("./data/projects");
const internships = require("./data/internships");

const Learning = require("./models/Learning");
const learning = require("./data/learning");

const Interview = require("./models/Interview");
const interviewQuestions = require("./data/interviewQuestions");

dotenv.config();

mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("MongoDB Connected");

    // Delete existing data
    await Project.deleteMany();
    await Internship.deleteMany();
    await Learning.deleteMany();

    await Project.insertMany(projects);
    await Internship.insertMany(internships);
    await Learning.insertMany(learning);

    await Interview.deleteMany();
    await Interview.insertMany(interviewQuestions);

    console.log("Projects & Internships Seeded Successfully!");

    process.exit();
  })
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });
