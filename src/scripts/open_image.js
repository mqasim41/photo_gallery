function openImageEditor(imageUrl) {
    if (imageUrl) {
      const img = new Image();
      img.src = imageUrl;
  
      img.onload = () => {
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
  
        if (editorWindow) {
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
              <h2>Delete</h2>
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

    export {openImageEditor};