import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { getIsLoggedIn } from 'redux/authSlice';

export const PublicRoute = ({ children, restricted = false }) => {
  const isLoggedIn = useSelector(getIsLoggedIn);
  return isLoggedIn && restricted ? <Navigate to="/" /> : children;
};
