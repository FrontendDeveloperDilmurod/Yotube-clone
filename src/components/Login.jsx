import React, { useState } from 'react';
import { Input, Button, Checkbox } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import Yotube_Logo from '../assets/YouTube_Logo.png';  // Ensure the YouTube logo is in the assets folder

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const navigate = useNavigate();

    const handleLogin = () => {
        if (email && password) {
            // Here you would call your API or handle authentication
            console.log('Logged in with:', { email, password, rememberMe });
            // Redirect to homepage or dashboard after successful login
            navigate('/');
        } else {
            alert('Please fill in both fields.');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen ">
            <div className="w-full max-w-sm p-8 bg-white rounded-lg shadow-lg">
                <div className="flex justify-center mb-6">
                    <img src={Yotube_Logo} alt="YouTube Logo" className="w-32" />
                </div>
                <h2 className="mb-4 text-2xl font-semibold text-center">Sign in to YouTube</h2>

                <div className="mb-4">
                    <Input
                        placeholder="Email or phone"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full p-3 border rounded-md"
                    />
                </div>

                <div className="mb-6">
                    <Input.Password
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full p-3 border rounded-md"
                    />
                </div>

                <div className="flex items-center mb-6">
                    <Checkbox
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        className="text-sm"
                    >
                        Remember me
                    </Checkbox>
                </div>

                <div className="mb-4">
                    <Button type="primary" onClick={handleLogin} className="w-full p-3 text-white bg-red-500 rounded-lg hover:bg-red-600">
                        Sign in
                    </Button>
                </div>

                <div className="mb-4 text-center">
                    <Link to="/forgot-password" className="text-sm text-blue-500 hover:underline">Forgot password?</Link>
                </div>

                <div className="text-center">
                    <span className="text-sm">Don't have an account? </span>
                    <Link to="/signup" className="text-sm text-blue-500 hover:underline">Create one</Link>
                </div>
            </div>
        </div>
    );
};

export default Login;
