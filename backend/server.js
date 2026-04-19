const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// DB connect
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

// test route
app.get("/", (req, res) => {
    res.send("API running 🚀");
});

app.listen(5000, () => {
    console.log("Server running on http://localhost:5000");

});

const Project = require("./models/Project");

// GET all projects
app.get("/projects", async (req, res) => {
    const data = await Project.find();
    res.json(data);
});

// ADD project
app.post("/projects", async (req, res) => {
    const project = new Project(req.body);
    await project.save();
    res.json(project);
});