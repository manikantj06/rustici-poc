import * as React from "react";
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";

// type DocumentViewerProps = {
//   fileName: string;
//   fileURL: string;
// };

const DocumentViewer = ({ fileName, fileURL }) => {
  return (
    <DocViewer
      pluginRenderers={DocViewerRenderers}
      documents={[
        {
          uri: fileURL,
          fileName: "Sample name",
        },
      ]}
      style={{ height: 800, width: 700 }}
    />
  );
};

export default DocumentViewer;
