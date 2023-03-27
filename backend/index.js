const express = require("express");
const { getAllCourses } = require("./read-course");
const { createCourseRoot } = require("./write-course");
const app = express();
const port = 8000;

// Define an array of courses

// API to get all courses
app.get("/courses", async (req, res) => {
  getAllCourses((courses) => {
    res.send(courses);
  });
});

// API to handle post request with .zip file
app.post("/upload", async (req, res) => {
  // Here we can do some processing with the uploaded file
  // However, since we only need to return a 204 response, we can simply send it and end the response
  await createCourseRoot();
  // https://cloud.scorm.com/api/cloud/registration/launch/112b1ec2-ee63-4480-b0da-c07a2fc7d5fc
  res.status(204).end();
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
