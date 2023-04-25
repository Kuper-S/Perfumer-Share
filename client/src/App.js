
import './App.css';
import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import LoginPage from './pages/Login-SingIn/LoginPage';
import SingupPage from './pages/Login-SingIn/SingupPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
      {/* <Route path="/" element={<Home />} /> */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/singup" element={<SingupPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
