import React, { useState } from "react";
// import DocViewer, { DocViewerRenderers, Vie } from "react-doc-viewer";
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";

function FileViewer() {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    console.log(file, file.type.includes("video"));
    if (
      (file &&
        (file.type === "image/jpeg" ||
          file.type === "image/png" ||
          file.type === "application/pdf" ||
          file.type === "application/msword" ||
          file.type ===
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document")) ||
      file.type.includes("video")
    ) {
      setSelectedFile(file);
    } else {
      setSelectedFile(null);
    }
  };

  const renderFile = () => {
    const file_url = window.URL.createObjectURL(selectedFile);
    if (selectedFile.type === "application/pdf") {
      return (
        <embed
          src={file_url}
          type="application/pdf"
          width="100%"
          height="500px"
        />
      );
    } else if (
      selectedFile.type === "application/msword" ||
      selectedFile.type ===
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
      return (
        <>
          {/* <iframe
            title="Google Docs Viewer"
            className="doc"
            width="100%"
            height="600"
            frameborder="0"
            src={`https://view.officeapps.live.com/op/embed.aspx?src=${encodeURI(
              file_url
            )}`}
          ></iframe> */}
          <DocViewer
            pluginRenderers={DocViewerRenderers}
            documents={[
              {
                uri: "https://calibre-ebook.com/downloads/demos/demo.docx",
                fileName: selectedFile.name,
              },
            ]}
            style={{ height: 800, width: 700 }}
          />
        </>
      );
    } else if (selectedFile.type.includes("video"))
      return (
        <video src={selectedFile} width="100%" height="500px" controls>
          Your browser does not support the video tag.
        </video>
      );
    else {
      return <img src={file_url} alt="Selected file" className="img-fluid" />;
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6">
          <div className="form-group">
            <label htmlFor="fileInput">Select a file:</label>
            <input
              type="file"
              className="form-control-file"
              id="fileInput"
              onChange={handleFileChange}
              accept="*"
            />
          </div>
        </div>
        <div className="col-md-6">{selectedFile && renderFile()}</div>
      </div>
    </div>
  );
}

export default FileViewer;
