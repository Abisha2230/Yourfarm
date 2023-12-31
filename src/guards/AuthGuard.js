import {  useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
// pages
import Login from '../pages/authentication/Login';

// ----------------------------------------------------------------------

AuthGuard.propTypes = {
  children: PropTypes.node
};

export default function AuthGuard({ children }) {
 
  const UserLog = JSON.parse(window.localStorage.getItem('User'))?.UserIsLogged;
  const Token  = JSON.parse(window.localStorage.getItem('Token'))?.useAuth;
  const { pathname } = useLocation();
  const [requestedLocation, setRequestedLocation] = useState(null);
  if (!UserLog || Token===null) {
    if (pathname !== requestedLocation) {
      setRequestedLocation(pathname);
    }
  
    return <Login />;
  }

  if (requestedLocation && pathname !== requestedLocation) {
    setRequestedLocation(null);
    return <Navigate to={requestedLocation} />;
  }

  return <>{children}</>;
}
