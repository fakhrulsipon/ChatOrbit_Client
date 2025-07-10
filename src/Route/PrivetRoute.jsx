import React, { use } from 'react';
import { AuthContext } from '../Provider/Provider';
import { Navigate } from 'react-router';

const PrivetRoute = ({children}) => {
    const {user, loading} = use(AuthContext)
    if(loading){
        return <span className="loading loading-bars loading-xl"></span>
    }
    if(!user){
        return <Navigate to={'/login'}></Navigate>
    }
    return children
};

export default PrivetRoute;