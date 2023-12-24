import React, { useState, useEffect } from 'react';
import { getMe } from "../scripts/get_me.js";
import { reToken } from "../scripts/refresh.js";
import { useNavigate } from "react-router-dom";
import { getPhotos } from "../scripts/get_photos.js";
import { openImageEditor } from "../scripts/open_image.js";
import { updatePhoto } from '../scripts/update_photo.js';
export const Gallery = (props) => 
{
  //   const [images, setImages] = useState([
  //   'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8fA%3D%3D',
  //   'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  //   'https://images.unsplash.com/photo-1541963463532-d68292c34b19?q=80&w=388&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  //   'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8fA%3D%3D',
  //   'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  //   // Add more image URLs as needed
  // ]);
  const [images, setImages] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);
  const navigate = useNavigate();

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

 	const deleteSelectedImages = () => 
 	{
    	const updatedImages = images.filter(
      	(imageUrl) => !selectedImages.includes(imageUrl)
    	);
	    setImages(updatedImages);
	    setSelectedImages([]);
 	 };

   const uploadImages = async (files) =>
   {
    try 
    {
    const formData = new FormData();

    for (let i = 0; i < files.length; i++) 
    {
      formData.append('images', files[i]);
    }
      const response = await fetch('http://104.198.137.113:6869/upload', 
      {
        method: 'POST',
        body: formData,
      });

      if (response.ok) 
      {
        // If the images were uploaded successfully, update the image gallery
        // Fetch the updated image URLs from the server or update as needed
        // For this example, assuming the response includes new image URLs
        const { uploadedImages } = await response.json();
        setImages([...images, ...uploadedImages]);
      } 
      else 
      {
        console.error('Failed to upload images', response);
      }
    } 
    catch (error) 
    {
      console.error('Error uploading images:', error);
    }
   };

  const uploadImagesToServer = async (files) => 
  {
    const response = await fetch(`${BASE_URL}/upload`, 
    {
      method: 'POST',
      body: formData,
      headers: 
      {
        Authorization: `Bearer YOUR_ACCESS_TOKEN`, // Replace with your actual access token
      },
    });

      if (response.ok) {
        // If the images were uploaded successfully, update the image gallery
        // Fetch the updated image URLs from the server or update as needed
        // For this example, assuming the response includes new image URLs
        const { uploadedImages } = await response.json();
        setImages([...images, ...uploadedImages]);
      } else {
        console.error('Failed to upload images');
      }
    } catch (error) {
      console.error('Error uploading images:', error);
    }
  };

   const handleFileSelect = (event) => 
   {
    const selectedFiles = event.target.files;
    const uploadedImages = Array.from(selectedFiles).map((file) =>
      URL.createObjectURL(file)
    );
    setImages([...images, ...uploadedImages]);
    uploadImages(selectedFiles);
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
