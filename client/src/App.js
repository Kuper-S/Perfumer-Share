
import './App.css';
import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useSelector } from 'react-redux';
import LoginPage from './pages/Login-SingIn/LoginPage';
import SignupPage from './pages/Login-SingIn/SignupPage';
import HomePage from './pages/Home/HomePage';

function App() {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      
    </Routes>
  </BrowserRouter>
  );
}

export default App;
