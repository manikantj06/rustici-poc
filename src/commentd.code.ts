/** 

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


  {/* <iframe src={launchLink2}></iframe> 
      {/* <button>
        <a target="_blank" href={launchLink2} rel="noreferrer">
          Open Course
        </a>
      </button> }
      {/* <FileViewer /> }

      const COURSE_ID = "JS_SAMPLE_COURSE";
const APP_ID = "CFEMPE5NBD";

const launchLink = `https://cloud.scorm.com/content/courses/${APP_ID}/${COURSE_ID}/0/scormdriver/indexAPI.html`;

const launchLink2 =
  "https://cloud.scorm.com/api/cloud/registration/launch/98a18b0c-d3d7-4a09-9f31-4732715daf1a";

function getLaunchLink(courseId) {
  return `https://cloud.scorm.com/content/courses/${APP_ID}/${courseId}/0/scormdriver/indexAPI.html`;
}
import axios from "axios";
import FileViewer from "./Fileviewer";

*/
