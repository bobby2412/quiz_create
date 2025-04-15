import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import FileUpload from './FileUpload';
import Login from './login';
import Signup from './signup';
import Home from './HomePage';
import Profile from './components/Profile';
const isauthed = () => {
    const token = localStorage.getItem('jwt');
    return !!token;
}

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Navigate to="/home" replace />} />
                <Route
                    path="/login"
                    element={isauthed() ? <Navigate to="/home" replace /> : <Login />}
                />
                <Route path="/Profile" element={<Profile />} />

                <Route path="/home" element={<Home />} />
                <Route path="/signin" element={<Signup />} />
                <Route path="/uploads" element={<FileUpload />} />
            </Routes>
        </Router>
    );
}

export default App;
