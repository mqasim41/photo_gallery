// scripts/get_me.js
async function getMe() {
    const accessToken = localStorage.getItem('accessToken');
  
    if (!accessToken) {
      console.error('Access token not found in localStorage');
      return Promise.reject(new Error('Access token not found in localStorage'));
    }
  
    const apiUrl = 'http://34.66.223.9:6868';
    const endpoint = '/get-me';
    const url = `${apiUrl}${endpoint}`;
    const requestOptions = {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    };
  
    try {
      const response = await fetch(url, requestOptions);
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
    
      const data = await response.json();
      console.log('API Response:', data);
      return data;
    } catch (error) {
      console.error('API Request Error:', error.message);
      throw error; 
    }
  }
  
  export { getMe };
  