import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { Header } from './Header/Header';
import { Navigate, Route, Routes } from 'react-router-dom';
import { ContactListPage } from 'pages/ContactListPage';
import { getIsRefreshing, refreshUserThunk } from 'redux/authSlice';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';
import SignupPage from 'pages/SingupPage';
import LoginPage from 'pages/LoginPage';

export const App = () => {
  const dispatch = useDispatch();
  const isRefreshing = useSelector(getIsRefreshing);

  useEffect(() => {
    dispatch(refreshUserThunk());
  }, [dispatch]);

  return isRefreshing ? (
    <b> ..refreshing user...</b>
  ) : (
    <Routes>
      <Route path="/" element={<Header />}>
        <Route
          index
          element={
            <PrivateRoute redirectTo="/login">
              <ContactListPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/login"
          element={
            <PublicRoute restricted>
              <LoginPage />
            </PublicRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <PublicRoute restricted>
              <SignupPage />
            </PublicRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
};
