
import './App.css';
import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from './state/actions/authAction';
import Navbar from './layout/Nav/Navbar';
import LoginPage from './pages/Login-SingIn/LoginPage';
import SignupPage from './pages/Login-SingIn/SignupPage';
import HomePage from './pages/Home/HomePage';

function App() {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutUser());
  }
  return (
    <BrowserRouter>
      <Navbar user={user} onLogout={handleLogout} />
        <Routes>
        <Route path="/" element={<HomePage isAuthenticated={isAuthenticated} />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
      </Routes>
  </BrowserRouter>
  );
}

export default App;
