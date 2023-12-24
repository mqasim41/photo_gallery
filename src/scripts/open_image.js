import { updatePhoto } from './update_photo';

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
          <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
          <style>
            .editor-content {
              padding: 20px;
              text-align: center;
            }

            .edit-btn {
              margin-top: 10px;
              background-color: #007bff;
              color: white;
              cursor: pointer;
            }

            img {
              max-width: 100%;
              max-height: 80vh;
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
            <img src="${imageUrl}" alt="Selected" class="img-fluid">
            <input type="file" id="fileInput" class="mt-3 mb-3">
            <button class="btn btn-primary edit-btn" id="updateButton">Update</button>
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
