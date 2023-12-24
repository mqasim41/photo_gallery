

import React, { Component } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom"; 
import Login from './components/Login'
import Register from './components/Register'
import Gallery from './Pages/Gallery';
import './styles/App.css';
import "./styles/styles.css";
import 'bootstrap/dist/css/bootstrap.min.css';


class App extends Component {
  render()
  {
    return (      
      <BrowserRouter>
        <Routes>
          <Route exact path="/login" element={<Login/>}/>
          <Route exact path="/register" element={<Register/>}/>
          <Route path="/gallery" element={<Gallery/>}/>
        </Routes>
      </BrowserRouter>

    );
  }
}

export default App;
