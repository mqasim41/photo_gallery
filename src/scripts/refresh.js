async function reToken() {
    const refreshToken = localStorage.getItem('refreshToken');
  
    if (!refreshToken) {
      console.error('Refresh token not found in localStorage');
      // Handle the case where the refresh token is not available
      return;
    }
  
    const apiUrl = 'http://104.198.137.113:6868';
    const endpoint = '/refresh-token';
    const url = `${apiUrl}${endpoint}`;
  
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${refreshToken}`,
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        console.log(response);
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json();
  
      // Handle the response data
      console.log('Refresh Token API Response:', data);
  
      // Update the access token in localStorage with the newly received token
      if (data.data.accessToken) {
        localStorage.setItem('accessToken', data.data.accessToken);
        localStorage.setItem('refreshToken', data.data.refreshToken);
        console.log('Access and Refresh token refreshed and updated in localStorage');
      } else {
        console.error('Access token not found in the refresh token response');
        // Handle the case where the access token is not available in the response
      }
    } catch (error) {
      // Handle fetch or JSON parsing errors
      console.error('Refresh Token API Request Error:', error.message);
      throw error;
    }
  }
  
  export {reToken};
  