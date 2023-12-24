import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Login = (props) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://104.198.137.113:6868/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      const responseData = await response.json();

      if (response.ok) {
        console.log('Login Successful',responseData.data)
        localStorage.setItem('userId', responseData.data.id);
        localStorage.setItem('accessToken', responseData.data.accessToken);
        localStorage.setItem('refreshToken', responseData.data.refreshToken);

        // Redirect or perform other actions upon successful login
        navigate('/gallery');
      } else if (response.status === 400) {
        // Handle errors based on the structure of your API response
        const invalidCredentials = document.getElementById('invalidCredentials');
        invalidCredentials.innerText = 'Invalid Credentials';
        console.error('Login failed:', response);
        // You may display an error message to the user
      }
    } catch (error) {
      // Handle network errors or other exceptions
      console.error('Error during login:', error.message);
    }
  };

  const navigateToRegister = () => {
    // Use navigate to navigate to the '/register' route
    navigate('/register');
  };

  return (
    <div className="App auth-form-container">
      <h2>Login</h2>
      <form className="login-form" onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="youremail@gmail.com"
          id="email"
          name="email"
        />
        <label htmlFor="password">Password</label>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="********"
          id="password"
          name="password"
        />
        <div className='mb-1 mt-1' style={{ fontSize: '2.25vh', color: 'red' }} id='invalidCredentials'></div>
        <button type="submit">Log In</button>
      </form>
      <button className="link-btn" onClick={navigateToRegister}>
        Don't have an account? Click here to register.
      </button>
    </div>
  );
};

export default Login;
