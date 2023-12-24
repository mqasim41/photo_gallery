import React, { useState, useEffect } from 'react';

export const Gallery = (props) => {
  //   const [images, setImages] = useState([
  //   'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8fA%3D%3D',
  //   'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  //   'https://images.unsplash.com/photo-1541963463532-d68292c34b19?q=80&w=388&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  //   'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8fA%3D%3D',
  //   'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  //   // Add more image URLs as needed
  // ]);
  const [images, setImages] = useState([]);
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

  const openImageEditor = (imageUrl) =>
  {
  if (imageUrl) 
  {
    const img = new Image();
    img.src = imageUrl;

    img.onload = () => 
    {
      const maxWidth = window.innerWidth * 0.9; // Set the maximum width as 90% of window width
      const maxHeight = window.innerHeight * 0.9; // Set the maximum height as 90% of window height

      const aspectRatio = img.width / img.height;

      let newWidth = img.width;
      let newHeight = img.height;

      // Adjust image dimensions if they exceed the maximum width or height
      if (newWidth > maxWidth) {
        newWidth = maxWidth;
        newHeight = newWidth / aspectRatio;
      }
      if (newHeight > maxHeight) {
        newHeight = maxHeight;
        newWidth = newHeight * aspectRatio;
      }

      const left = (window.innerWidth - newWidth) / 2;
      const top = (window.innerHeight - newHeight) / 2;

      const editorWindow = window.open('', 'Image Editor', `width=${newWidth},height=${newHeight},left=${left},top=${top}`);

      if (editorWindow) 
      {
        editorWindow.document.head.innerHTML = `
          <style>
            /* Existing styles remain unchanged */
            .edit-btn {
              position: absolute;
              top: 10px;
              right: 10px;
              border: none;
              background-color: black;
              color: white;
              cursor: pointer;
              padding: 10px 15px;
              border-radius:0.5rem;
            }

            img {
              max-width: 100%;
              max-height: 100%;
              height: auto;
              width: auto;
              margin: 0;
            }
          </style>
        `;
        editorWindow.document.body.innerHTML = `
          <div class="editor-content">
            <h2>Edit Image</h2>
            <img src="${imageUrl}" alt="Selected" style="width: ${newWidth}px; height: ${newHeight}px;">
            <button class="edit-btn">Edit</button>
          </div>
        `;
      } else {
        alert('Please allow pop-ups to use the image editor.');
      }
    };
  
    }
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
