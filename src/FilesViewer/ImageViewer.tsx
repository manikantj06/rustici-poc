import React from "react";

type ImageViewerProps = {
  fileUrl: string;
};

const ImageViewer: React.FC<ImageViewerProps> = ({ fileUrl }) => {
  return <img src={fileUrl} alt="Selected file" className="img-fluid" />;
};

export default ImageViewer;
