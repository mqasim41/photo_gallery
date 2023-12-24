import React, { useState, useEffect } from 'react';
import { getMe } from "../scripts/get_me.js";
import { reToken } from "../scripts/refresh.js";
import { useNavigate } from "react-router-dom";
import { getPhotos } from "../scripts/get_photos.js";
import { openImageEditor } from "../scripts/open_image.js";
import { uploadPhotos } from '../scripts/upload_photos.js';
import { deletePhotos } from '../scripts/delete_photos.js';

const Gallery = (props) => {
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
    fetchData().then((result) => {
      const imageUrlArray = result.data.allPhotos;
      setImages(imageUrlArray);
    });
  }, [navigate]);

  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedImages, setSelectedImages] = useState([]);

  const toggleImageSelection = (imageId) => {
    if (selectedImages.includes(imageId)) {
      setSelectedImages(selectedImages.filter((img) => img !== imageId));
    } else {
      setSelectedImages([...selectedImages, imageId]);
    }
  };

  function filterObjectsByIds(objectsArray, idArray) {
    return objectsArray.filter(obj => !idArray.includes(obj.id));
  }

  const deleteSelectedImages = async () => {
    const updatedImages = filterObjectsByIds(images, selectedImages);
    setImages(updatedImages);
    await deletePhotos(selectedImages);
    setSelectedImages([]);
  };

  const handleFileSelect = async (event) => {
    const selectedFiles = event.target.files;
    const uploadedImages = Array.from(selectedFiles).map((file, index) => ({
      file,
      caption: `Caption for Image ${index + 1}`,
    }));

    await uploadPhotos(uploadedImages);

    await fetchData().then((result) => {
      const imageUrlArray = result.data.allPhotos;
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
    <div className="container-fluid photo-gallery  ">
      <div className="col-12 d-flex justify-content-end">
          <button className='btn-primary-outline' style={{width:'100px'}}>Logout</button>
        </div>
      <div className='row justify-content-end'>
        
      <div className="col-12 col-md-4 d-flex justify-content-end mt-3">
          {selectedImages.length > 0 && (
            <button className="btn-primary-outline " style={{width:'100px'}} onClick={deleteSelectedImages}>
              Delete 
            </button>
          )}
      </div>
      </div>
      <div className="row gallery-title d-flex justify-content-start">
        <div className="col-12">
          <h1 className="text-center">Photo Gallery</h1>
        </div>
        
      </div>
      <div className='row mb-3 mt-4 justify-content-center'>
      <div className="col-12 col-md-8 d-flex justify-content-center ">
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
        </div>
      </div>
      
      <div className="row image-container justify-content-around">
        {images.map((image, index) => (
          <div key={index} className="col-12 col-sm-6 col-md-4 col-lg-3 image-item">
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