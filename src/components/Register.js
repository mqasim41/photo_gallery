import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Register = (props) => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPass] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('YOUR_BACKEND_API_REGISTER_ENDPOINT', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          password,
        }),
      });

      if (response.ok) {
        
        const data = await response.json();
        console.log('Registration successful:', data);

        
        navigate('/');
      } else {
        // Handle errors based on the structure of your API response
        const errorData = await response.json();
        console.error('Registration failed:', errorData);
        // You may display an error message to the user
      }
    } catch (error) {
      // Handle network errors or other exceptions
      console.error('Error during registration:', error.message);
    }
  };

  const navigateToLogin = () => {
    // Use navigate to navigate to the '/login' route
    navigate('/');
  };

  return (
    <div className="auth-form-container">
      <h2>Register</h2>
      <form className="register-form" onSubmit={handleSubmit}>
        <label htmlFor="firstName">First Name</label>
        <input value={firstName} onChange={(e) => setFirstName(e.target.value)} id="firstName" placeholder="First Name" />
        
        <label htmlFor="lastName">Last Name</label>
        <input value={lastName} onChange={(e) => setLastName(e.target.value)} id="lastName" placeholder="Last Name" />

        <label htmlFor="email">Email</label>
        <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="youremail@gmail.com" id="email" name="email" />
        
        <label htmlFor="password">Password</label>
        <input value={password} onChange={(e) => setPass(e.target.value)} type="password" placeholder="********" id="password" name="password" />
        
        <button type="submit">Register</button>
      </form>
      <button className="link-btn" onClick={navigateToLogin}>
        Already have an account? Click here to login.
      </button>
    </div>
  );
};

export default Register;
