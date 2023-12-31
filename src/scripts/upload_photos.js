const uploadPhotos = async (selectedFiles) => {
    const apiUrl = 'http://34.69.126.218:6869/upload';
    const accessToken = localStorage.getItem('accessToken');
  
    const formData = new FormData();
  
    selectedFiles.forEach((image, index) => {
      formData.append(`files`, image.file);
      formData.append(`captions`, image.caption || ""); 
    });
  
    const requestOptions = {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
      credentials: 'include',
      body: formData,
    };
  
    try {
      const response = await fetch(apiUrl, requestOptions);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const responseData = await response.json();
      console.log('API Response:', responseData);
  
      
    } catch (error) {
      console.error('API Request Error:', error.message);
      
    }
  };
  export{uploadPhotos};
  