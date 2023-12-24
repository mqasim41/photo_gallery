import { updatePhoto } from './update_photo'; // Import the function that handles the API call

function openImageEditor(imageUrl, id) {
  if (imageUrl) {
    const img = new Image();
    img.src = imageUrl;

    img.onload = () => {
      const maxWidth = window.innerWidth * 0.9;
      const maxHeight = window.innerHeight * 0.9;

      let newWidth = img.width;
      let newHeight = img.height;

      if (newWidth > maxWidth) {
        newWidth = maxWidth;
        newHeight = newWidth / (img.width / img.height);
      }
      if (newHeight > maxHeight) {
        newHeight = maxHeight;
        newWidth = newHeight * (img.width / img.height);
      }

      const left = (window.innerWidth - newWidth) / 2;
      const top = (window.innerHeight - newHeight) / 2;

      const editorWindow = window.open('', 'Image Editor', `width=${newWidth},height=${newHeight},left=${left},top=${top}`);

      if (editorWindow) {
        editorWindow.document.head.innerHTML = `
          <style>
            .edit-btn {
              position: absolute;
              top: 10px;
              right: 10px;
              border: none;
              background-color: black;
              color: white;
              cursor: pointer;
              padding: 10px 15px;
              border-radius: 0.5rem;
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
            <input type="file" id="fileInput" />
            <button class="edit-btn" id="updateButton">Update</button>
          </div>
        `;

        const fileInput = editorWindow.document.getElementById('fileInput');
        const updateButton = editorWindow.document.getElementById('updateButton');

        updateButton.addEventListener('click', async () => {
          const file = fileInput.files[0];
          if (file) {
            // Call the updatePhoto API function with the file, id, and other data
            await updatePhoto(id, file, 'HelloWorld');
            editorWindow.close();
          } else {
            alert('Please select a file.');
          }
        });
      } else {
        alert('Please allow pop-ups to use the image editor.');
      }
    };
  }
}

export { openImageEditor };
