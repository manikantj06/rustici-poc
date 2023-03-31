import React from "react";

type PdfViewerProps = {
  fileUrl: string;
};

const PdfViewer: React.FC<PdfViewerProps> = ({ fileUrl }) => {
  return (
    <embed src={fileUrl} type="application/pdf" width="100%" height="500px" />
  );
};

export default PdfViewer;
