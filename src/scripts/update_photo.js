async function updatePhoto(id, file, caption) {
    const apiUrl = 'http://34.66.223.9:6869/update-photos';
    const accessToken = localStorage.getItem('accessToken');
  
    // Create form data
    const formData = new FormData();
    formData.append('file', file);
    formData.append('id', id);
    formData.append('caption', caption);
  
    const requestOptions = {
      method: 'PUT',
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
  
      // Handle the response data here
    } catch (error) {
      console.error('API Request Error:', error.message);
      // Handle errors here
    }
  };
  
  // Call the updatePhoto function
export {updatePhoto};