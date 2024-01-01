async function logout(userId) {
    const apiUrl = 'http://34.66.223.9:6868/logout'; // Replace {{url}} with your actual API URL
  
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: userId, 
      }),
    };
  
    try {
      const response = await fetch(apiUrl, requestOptions);
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
  
      const responseData = await response.json();
      console.log('API Response:', responseData);
  
    } catch (error) {
      console.error('API Request Error:', error.message);
      
    }
  }
  
 
export {logout};
  