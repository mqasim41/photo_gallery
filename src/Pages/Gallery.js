import React, { useState, useEffect } from 'react';
import { getMe } from "../scripts/get_me.js";
import { reToken } from "../scripts/refresh.js";
import { useNavigate } from "react-router-dom";
import { getPhotos } from "../scripts/get_photos.js";
import { openImageEditor } from "../scripts/open_image.js";
import { uploadPhotos } from '../scripts/upload_photos.js';
import { deletePhotos } from '../scripts/delete_photos.js';
export const Gallery = (props) => {
  const navigate = useNavigate();
  const [images, setImages] = useState([]); // Initialize with an empty array
  const fetchData = async () => {
    try {
      await getMe();
      const data = await getPhotos();
      return data;
    } catch (e) {
      try {
        await reToken();
      } catch (e) {
        alert("Your session has expired.");
        navigate('/login');
      }
    }
  };
  useEffect(() => {

    fetchData().then((result)=>{
      const imageUrlArray = result.data.allPhotos;

      setImages(imageUrlArray);
    });
    
  }, [navigate]);
 
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedImages, setSelectedImages] = useState([]);

    const toggleImageSelection = (imageId) => 
    {
      if (selectedImages.includes(imageUrl)) 
      {
        setSelectedImages(selectedImages.filter((img) => img !== imageUrl));
      } 
      else 
      {
        setSelectedImages([...selectedImages, imageUrl]);
      }
  };

 	  const deleteSelectedImages = async () => {
    
    await deletePhotos(selectedImages);
    fetchData().then((result)=>{
      const imageUrlArray = result.data.allPhotos;

      setImages(imageUrlArray);
    });
    setSelectedImages([]);
  };

  const handleFileSelect = async (event) => {
    const selectedFiles = event.target.files;
    const uploadedImages = Array.from(selectedFiles).map((file, index) => ({
      file,
      caption: `Caption for Image ${index + 1}`, 
    }));

    await uploadPhotos(uploadedImages);
    console.log("ran");
    fetchData().then((result)=>{
      const imageUrlArray = result.data.allPhotos;
      console.log(imageUrlArray);
      setImages(imageUrlArray);
    });
  };


  const handleImageClick = (imageUrl, imageId) => {
    setSelectedImage(imageUrl);
    openImageEditor(imageUrl, imageId);
  };

  useEffect(() => {
  const handleResize = () => {
    const selectedImageElement = document.querySelector(`img[src="${selectedImage}"]`);
    if (selectedImageElement) {
      const img = new Image();
      img.src = selectedImageElement.src;
      img.onload = () => {
        const editorWindow = window.open('', 'Image Editor');
        if (editorWindow) {
          editorWindow.resizeTo(img.width, img.height);
        }
      };
    }
  };

  window.addEventListener('resize', handleResize);
  return () => window.removeEventListener('resize', handleResize);
}, [selectedImage]);

  return (
    <div className="photo-gallery">
      <div className="gallery-title">
        <h1>Photo Gallery</h1>
        <label htmlFor="fileInput" className="add-btn upload-button">
          +
          <input
            style={{ display: 'none' }}
            type="file"
            id="fileInput"
            accept="image/*"
            multiple
            onChange={handleFileSelect}
          />
        </label>

        {selectedImages.length > 0 && (
          <button className="delete-btn" onClick={deleteSelectedImages}>
            Delete Selected
          </button>
        )}
      </div>
      <div className="image-container">
        {images.map((image, index) => (
          <div key={index} className="image-item">
            <label>
              <input
                type="checkbox"
                checked={selectedImages.includes(image.id)}
                onChange={() => toggleImageSelection(image.id)}
              />
              <img
                id={image.id}
                src={image.url}
                alt={`Image ${index + 1}`}
                onClick={() => handleImageClick(image.url, image.id)}
              />
            </label>
          </div>
        ))}
      </div>

    </div>
  );
};

export default Gallery;