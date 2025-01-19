import React from 'react';

const Error = () => {
    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="text-center">
                <h1 className="text-6xl font-bold text-red-600">404</h1>
                <p className="text-2xl mt-4">Page Not Found</p>
                <p className="text-gray-600 mt-2">
                    Oops! The page you are looking for does not exist.
                </p>
                <a
                    href="/"
                    className="mt-6 inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                    Go Back Home
                </a>
            </div>
        </div>
    );
};

export default Error;
