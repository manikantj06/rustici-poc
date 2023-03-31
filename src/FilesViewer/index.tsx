import React from "react";
import styles from "./styles.module.css";
import DocTypeTabs from "../DocTypeTabs";
import VideoViewer from "./video.tsx";
import PdfViewer from "./PDFViewer.tsx";
import { FileTypes } from "./files-types.enum.ts";
import DocumentViewer from "./DocumentViewer.tsx";
import ImageViewer from "./ImageViewer.tsx";

type CourseMaterialViewerProps = {
  fileUrl: string;
  fileType: FileTypes;
};

const CourseMaterialViewer: React.FC<CourseMaterialViewerProps> = ({
  fileType,
  fileUrl,
}) => {
  return (
    <div className={styles.container}>
      {FileTypes.VIDEO === fileType && <VideoViewer fileUrl={fileUrl} />}
      {FileTypes.PDF === fileType && <PdfViewer fileUrl={fileUrl} />}
      {FileTypes.DOCS === fileType && (
        <DocumentViewer fileName={"Sample Name"} fileURL={fileUrl} />
      )}
      {FileTypes.IMAGE === fileType && <ImageViewer fileUrl={fileUrl} />}
    </div>
  );
};

export default CourseMaterialViewer;
