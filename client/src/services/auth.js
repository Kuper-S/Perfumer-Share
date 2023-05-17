import jwt from 'jsonwebtoken';
import { api } from './api';
import { loginStart, loginSuccess, loginFailure } from "../state/reducers/authReducer";

export const generateToken = (userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '7d' });
  return token;
};

export const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded.userId;
  } catch (err) {
    console.error(err);
    return null;
  }
};

export const handleLogin = async (e, email, password, dispatch, navigate) => {
  e.preventDefault();
  dispatch(loginStart());
  try {
    const response = await api.auth.login({ email, password });
    dispatch(loginSuccess(response));
    localStorage.setItem('token', response.token);
    navigate('/');
  } catch (error) {
    dispatch(loginFailure(error.message));
  }
};
