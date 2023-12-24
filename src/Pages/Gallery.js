import React, { useState, useEffect } from 'react';
import { getMe } from "../scripts/get_me.js";
import { reToken } from "../scripts/refresh.js";
import { useNavigate } from "react-router-dom";
import { getPhotos } from "../scripts/get_photos.js";
import { openImageEditor } from "../scripts/open_image.js";
import { updatePhoto } from '../scripts/update_photo.js';
export const Gallery = (props) => {
  const navigate = useNavigate();
  const [images, setImages] = useState([]); // Initialize with an empty array

  useEffect(() => {
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

    fetchData().then((result)=>{
      const imageUrlArray = result.data.allPhotos.map(image => image.url);
      console.log(result.data.allPhotos);
      setImages(imageUrlArray);
    });
    
  }, [navigate]);
 
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedImages, setSelectedImages] = useState([]);

    const toggleImageSelection = (imageUrl) => 
    {
	    if (selectedImages.includes(imageUrl)) 
	    {
	      setSelectedImages(selectedImages.filter((img) => img !== imageUrl));
	    } else 
	    {
	      setSelectedImages([...selectedImages, imageUrl]);
	    }
 	};

 	  const deleteSelectedImages = () => {
    const updatedImages = images.filter(
      (imageUrl) => !selectedImages.includes(imageUrl)
    );
    setImages(updatedImages);
    setSelectedImages([]);
  };

   const handleFileSelect = (event) => {
    const selectedFiles = event.target.files;
    const uploadedImages = Array.from(selectedFiles).map((file) =>
      URL.createObjectURL(file)
    );
    setImages([...images, ...uploadedImages]);
  };


  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl);
    openImageEditor(imageUrl);
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
        {images.map((imageUrl, index) => (
          <div key={index} className="image-item">
          <label>
              <input
                type="checkbox"
                checked={selectedImages.includes(imageUrl)}
                onChange={() => toggleImageSelection(imageUrl)}
              />
            <img
              src={imageUrl}
              alt={`Image ${index + 1}`}
              onClick={() => handleImageClick(imageUrl)}
            />
            </label>

          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;
