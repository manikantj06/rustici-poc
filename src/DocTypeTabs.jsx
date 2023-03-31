import React from "react";
import styles from "./FilesViewer/styles.module.css";
import { FileTypes } from "./FilesViewer/files-types.enum.ts";

const PDF_URL = "https://www.africau.edu/images/default/sample.pdf";
const VIDEO_URL =
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";

const IMG_URL =
  "https://images.pexels.com/photos/147411/italy-mountains-dawn-daybreak-147411.jpeg?auto=compress&cs=tinysrgb&w=800";

const DOCS = {
  url: "https://calibre-ebook.com/downloads/demos/demo.docx",
  name: "Sample Name",
};

const DocTypeTabs = ({ setCurrentTab }) => {
  return (
    <div className={styles.navbarItems}>
      <div
        onClick={() => {
          setCurrentTab({ fileUrl: PDF_URL, fileType: FileTypes.PDF });
        }}
        className={styles.navbarItem}
      >
        PDF Viewer
      </div>
      <div
        onClick={() => {
          setCurrentTab({ fileUrl: DOCS.url, fileType: FileTypes.DOCS });
        }}
        className={styles.navbarItem}
      >
        Docs Viewer
      </div>
      <div
        onClick={() => {
          setCurrentTab({ fileType: FileTypes.IMAGE, fileUrl: IMG_URL });
        }}
        className={styles.navbarItem}
      >
        Image Viewer
      </div>
      <div
        onClick={() => {
          setCurrentTab({ fileType: FileTypes.VIDEO, fileUrl: VIDEO_URL });
        }}
        className={styles.navbarItem}
      >
        Video Viewer
      </div>
      <div className={styles.navbarItem}>SCORM Viewer</div>
    </div>
  );
};

export default DocTypeTabs;
