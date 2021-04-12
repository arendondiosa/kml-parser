import React from "react";

const Home = () => {
  const handleFileInput = async (e) => {
    const fileUploaded = e.target.files[0];
    let formData = new FormData();
    formData.append("files", fileUploaded);

    const res = await fetch("/api/file", {
      method: "post",
      body: formData,
    });

    console.log(res)
  };

  return (
    <div className="container">
      <h1>File Upload</h1>
      <form id="form">
        <div className="input-group">
          <label htmlFor="files">Select files</label>
          <input id="files" type="file" multiple onChange={handleFileInput} />
        </div>
      </form>
    </div>
  );
};

export default Home;
