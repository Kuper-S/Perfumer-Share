
import './App.css';
import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import LoginPage from './pages/Login-SingIn/LoginPage';
import SignupPage from './pages/Login-SingIn/SignupPage';
import HomePage from './pages/Home/HomePage';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      {/* <Route path="*" element={<NotFoundPage />} /> */}
    </Routes>
  </BrowserRouter>
  );
}

export default App;
