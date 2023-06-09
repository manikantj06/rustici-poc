const express = require("express");
const { getAllCourses, getLaunchLink } = require("./read-course");
const { createCourseRoot } = require("./write-course");
const app = express();
const port = 8000;
const multer = require("multer");
const fs = require("fs");
const cors = require("cors");
const {
  deleteCourse,
  createNewCourse,
} = require("./scorm-provider/delete-course");
const { updateCourseTitle } = require("./scorm-provider/course-status");

app.use(express.urlencoded());
app.use(cors());

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

// Create the multer middleware with the storage engine
const upload = multer({ dest: "./uploads/" });

// API to get all courses
app.get("/course", async (req, res) => {
  const course = await getAllCourses();
  res.send(course);
});

// API to handle post request with .zip file
app.post("/upload", async (req, res) => {
  // Here we can do some processing with the uploaded file
  // However, since we only need to return a 204 response, we can simply send it and end the response
  await createCourseRoot();
  // https://cloud.scorm.com/api/cloud/registration/launch/112b1ec2-ee63-4480-b0da-c07a2fc7d5fc
  res.status(204).end();
});

app.post("/course", upload.single("uploaded_file"), async function (req, res) {
  // Read the contents of the uploaded file
  try {
    const filePath = req.file.path;
    const data = fs.createReadStream(filePath);
    await createCourseRoot(data);
    // https://cloud.scorm.com/api/cloud/registration/launch/21f48a62-6ebd-4df8-bfee-e0e767840288
    res.status(204);
  } catch (ex) {
    console.log("Error", ex);
  }

  // Save the data to a database or file system
  // ...

  res.send("File uploaded and processed successfully");
});

app.get("/course-link", async (req, res) => {
  const link = await getLaunchLink();
  res.send(link);
});

app.delete("/course", deleteCourse);
app.post("/new-course", createNewCourse);
app.put("/edit-course-title", updateCourseTitle);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
