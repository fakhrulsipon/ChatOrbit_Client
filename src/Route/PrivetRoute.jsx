import React, { use } from 'react';
import { AuthContext } from '../Provider/Provider';
import { Navigate, useLocation } from 'react-router';

const PrivetRoute = ({ children }) => {
  const { user, loading } = use(AuthContext)
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-indigo-100 via-white to-indigo-200">
        <div className="flex flex-col items-center gap-6 animate-fade-in">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-dashed rounded-full border-indigo-500 animate-spin"></div>
            <div className="absolute top-1/2 left-1/2 w-6 h-6 -translate-x-1/2 -translate-y-1/2 bg-indigo-500 rounded-full"></div>
          </div>
          <p className="text-xl font-bold text-indigo-700 animate-pulse tracking-wide">
            Loading please wait...
          </p>
        </div>
      </div>
    );
  }


  if (!user) {
    return <Navigate to={'/login'} state={location.pathname}></Navigate>
  }
  return children
};

export default PrivetRoute;