import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import FileUpload from './FileUpload';
import Login from './login';
import Signup from './signup';
import Home from './HomePage';

const isauthed = () => {
    const token = localStorage.getItem('token'); 
    return !token; 
}

function App() {
    return (
        <Router>
            <Routes>
            <Route path="/" element={<Navigate to="/home" replace />} />
            <>
            {isauthed() ? (
                <Route path="/login" element={<Navigate to="/home" replace />} />
            ) : (null)}
            </>
            <Route path="/login" element={<Login/>} />
                <Route path="/home" element={<Home />} />
                <Route path="/signin" element={<Signup/>} />
                <Route path="/uploads" element={<FileUpload />} />
            </Routes>
        </Router>
    );
}

export default App;
