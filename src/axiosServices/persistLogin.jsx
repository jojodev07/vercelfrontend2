import { useState, useEffect, useContext } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import { VerifyAuthToken } from './axiosHelper';

const PersistLogin = () => {
    const {isAuthenticated, loading} = useContext(AuthContext);

    if (loading) {
        return null;
    }

    if (!isAuthenticated) {
        return <Navigate to={"/login"} replace></Navigate>;
    } else {
        return <Outlet></Outlet>;
    }
};

export default PersistLogin;