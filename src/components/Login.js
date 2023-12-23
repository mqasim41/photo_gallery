import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import mockResponses from "../api-mock.json"; // Adjust the path based on your project structure

export const Login = (props) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Simulate API request (replace this with actual fetch call in production)
      const response = await simulateApiRequest(email, password);

      if (response.status === "success") {
        // Successful login
        console.log('Login successful:', response);
        // Redirect or perform other actions upon successful login
        navigate('/register');
      } else {
        // Handle errors based on the structure of your API response
        console.error('Login failed:', response);
        // You may display an error message to the user
      }
    } catch (error) {
      // Handle network errors or other exceptions
      console.error('Error during login:', error.message);
    }
  };

  const simulateApiRequest = async (email, password) => {
    // Simulate API request logic
    // In a real application, replace this with an actual fetch call to your backend
    // For now, use mockResponses to simulate different responses

    // Simulate a successful login
    if (email === "john.doe@example.com" && password === "password123") {
      return mockResponses.successfulLogin;
    }

    // Simulate a failed login (invalid credentials)
    return mockResponses.failedLogin;
  };

  const navigateToRegister = () => {
    // Use navigate to navigate to the '/register' route
    navigate('/register');
  };

  return (
    <div className="auth-form-container">
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
        <button type="submit" >Log In</button>
      </form>
      <button className="link-btn" onClick={navigateToRegister}>
        Don't have an account? Click here to register.
      </button>
    </div>
  );
};

export default Login;
