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

  return (
    <div className="App">
      <div className="container">
        <div className="doctypes">
          <DocTypeTabs setCurrentTab={setCurrentTab} />
        </div>
        <div className="files">
          <CourseMaterialViewer
            fileType={currentTab.fileType}
            fileUrl={currentTab.fileUrl}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
