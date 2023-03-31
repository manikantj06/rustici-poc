import React from "react";

type VideoViewerProps = {
  fileUrl: string;
};

const VideoViewer: React.FC<VideoViewerProps> = ({ fileUrl }) => {
  return (
    <video src={fileUrl} width="100%" height="500px" controls>
      Your browser does not support the video tag.
    </video>
  );
};

export default VideoViewer;
