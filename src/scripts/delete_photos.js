const deletePhotos = async (photoIds) => {
    const apiUrl = 'http://34.69.126.218:6869/delete';
    const accessToken = localStorage.getItem('accessToken');
  
    const requestOptions = {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: photoIds,
      }),
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
  
export {deletePhotos};
  