import { useState, useEffect, useContext } from 'react';
import { Outlet, Navigate } from 'react-router-dom'
import { AuthContext } from '../contexts/AuthContext';
import { VerifyAuthToken } from './axiosHelper';

const NoLoginCheck = () => {
    const {isAuthenticated, loading} = useContext(AuthContext);

    if (loading) return null;
    return isAuthenticated ? <Navigate to="/" replace /> : <Outlet />;
}

export default NoLoginCheck;