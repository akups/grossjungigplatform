import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const UploadPhotos = () => {
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);

  const uploadImage = async (event) => {
    const files = event.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "pictures");
    setLoading(true);
    const res = await fetch(
      "https://api.cloudinary.com/v1_1/akups/image/upload",
      {
        method: "POST",
        body: data,
      }
    );
    const file = await res.json();

    setImage(file.secure_url);
    setLoading(false);
  };

  // const uploadImage = async () => {
  //   const formData = new FormData();
  //   formData.append("file", image[0]);
  //   formData.append("upload_preset", "pictures");
  //   try {
  //     setLoading(true);
  //     const res = await axios.post(
  //       "https://api.cloudinary.com/v1_1/akups/image/upload",
  //       formData
  //     );
  //     const imageUrl = res.data.secure_url;
  //     const image = await axios.post("http://localhost:3000/upload", {
  //       imageUrl,
  //     });
  //     setLoading(false);
  //     setImage(image.data);
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

  return (
    <div style={{ height: "60vh" }}>
      <h1>Upload Images</h1>
      <input
        type="file"
        name="file"
        placeholder="Upload an image"
        onChange={uploadImage}
      />
      {loading ? (
        <h3>Loading....</h3>
      ) : (
        <img src={image} style={{ width: "300px" }} />
      )}
      <button type="submit">Submit</button>
    </div>
  );
};
export default UploadPhotos;
