async function getPhotos() {
    const apiUrl = 'http://104.198.137.113:6869/my-photos';
    const accessToken = localStorage.getItem('accessToken');
  
    const requestOptions = {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    };
  
    try {
      const response = await fetch(apiUrl, requestOptions);
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json();
      console.log('API Response:', JSON.stringify(data, null, 2));
  
      return data;
    } catch (error) {
      console.error('API Request Error:', error.message);
      throw error;
    }
  }
  export {getPhotos};
  