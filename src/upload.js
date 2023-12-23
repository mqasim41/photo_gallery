// upload.js
document.getElementById('fileInput').addEventListener('change', handleFileSelect);

function handleFileSelect(event) {
  const files = event.target.files;
  const imageContainer = document.getElementById('imageContainer');
  console.log(imageContainer);
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const reader = new FileReader();

    reader.onload = function (e) {
      const imageItem = document.createElement('div');
      imageItem.classList.add('image-item');

      const img = document.createElement('img');
      img.src = e.target.result;
      img.alt = file.name;

      imageItem.appendChild(img);
      imageContainer.appendChild(imageItem);
    };

    reader.readAsDataURL(file);
  }
  this.value = ''; // Reset the file input
}
