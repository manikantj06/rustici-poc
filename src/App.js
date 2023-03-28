import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";
import FileViewer from "./Fileviewer";

const COURSE_ID = "JS_SAMPLE_COURSE";
const APP_ID = "CFEMPE5NBD";

const launchLink = `https://cloud.scorm.com/content/courses/${APP_ID}/${COURSE_ID}/0/scormdriver/indexAPI.html`;

const launchLink2 =
  "https://cloud.scorm.com/content/courses/CFEMPE5NBD/JS_SAMPLE_COURSE/0/scormdriver/indexAPI.html";

function getLaunchLink(courseId) {
  return `https://cloud.scorm.com/content/courses/${APP_ID}/${courseId}/0/scormdriver/indexAPI.html`;
}

function App() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get("http://localhost:8000/course");
        setCourses(response.data.courses);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="App">
      {/* <iframe src={launchLink2}></iframe> */}
      <button>
        {courses.map((course) => (
          <a target="_blank" href={getLaunchLink(course.id)} rel="noreferrer">
            Open {course.id}
          </a>
        ))}
      </button>
      <FileViewer />
    </div>
  );
}

export default App;
