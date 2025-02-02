import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return <div className='text-center'>Loading...</div>; // Показываем индикатор загрузки, пока идет проверка
  }

  return user ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
