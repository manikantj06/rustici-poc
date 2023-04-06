import "./App.css";
import { useState } from "react";

import CourseMaterialViewer from "./FilesViewer/index.tsx";
import DocTypeTabs from "./DocTypeTabs";

// type currentTab = {
//   fileType: FileTypes | null,
//   fileUrl: string | null,
// };

function App() {
  const [currentTab, setCurrentTab] = useState({
    fileType: null,
    fileUrl: null,
  });

  const COURSE_LINK =
    "https://cloud.scorm.com/api/cloud/registration/launch/f0a8c976-7748-420a-8690-f51a1a9225b9";

  return (
    <div className="App">
      <div className="container">
        {/* <div className="doctypes">
          <DocTypeTabs setCurrentTab={setCurrentTab} />
        </div>
        <div className="files">
          <CourseMaterialViewer
            fileType={currentTab.fileType}
            fileUrl={currentTab.fileUrl}
          /> 
        </div>*/}
        <p
          style={{
            fontSize: "20px",
            marginRight: "2rem",
          }}
        >
          Scorm Course
        </p>
        <iframe
          style={{
            width: "800px",
            height: "800px",
          }}
          src={COURSE_LINK}
        ></iframe>
      </div>
    </div>
  );
}

export default App;
