import React, { useState } from 'react';
import { Button } from 'antd';
import developer from "../assets/ozim.jpg"; // Your avatar image

const Channels = () => {
    // User state
    const [user, setUser] = useState({
        name: "Frontend_Developer",
        title: "Full Stack Developer",
        bio: "Passionate about building great web applications with React, Node.js, and more.",
        isLoggedIn: true,
    });

    const [isEditing, setIsEditing] = useState(false);
    const [editedUser, setEditedUser] = useState({ ...user });

    // Logout function
    const handleLogout = () => {
        setUser({ ...user, isLoggedIn: false });
        console.log("Logged out!");
    };

    // Edit Profile function
    const handleEditProfile = () => {
        setIsEditing(true);
    };

    // Handle input change for editing profile
    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedUser({
            ...editedUser,
            [name]: value,
        });
    };

    // Save edited profile
    const handleSaveProfile = () => {
        setUser({ ...editedUser, isLoggedIn: true });
        setIsEditing(false);
    };

    // Cancel editing
    const handleCancelEdit = () => {
        setIsEditing(false);
        setEditedUser({ ...user });
    };

    if (!user.isLoggedIn) {
        return (
            <div className="p-6 mt-16 text-center bg-white rounded-lg shadow-lg">
                <h2 className="text-2xl font-semibold text-gray-800">Please log in</h2>
                <p className="text-sm text-gray-600">You need to log in to view and edit your profile.</p>
            </div>
        );
    }

    return (
        <div className="relative max-w-lg p-6 mx-auto mt-16 transition-shadow duration-300 bg-white rounded-lg shadow-lg hover:shadow-xl">
            <div className="flex justify-center mb-4">
                <img
                    src={developer}
                    alt="ozim"
                    className="object-cover w-32 h-32 transition-transform duration-300 transform rounded-full shadow-lg hover:scale-105"
                />
            </div>

            <div className="text-center">
                {isEditing ? (
                    <div>
                        <div className="mb-4">
                            <input
                                type="text"
                                name="name"
                                value={editedUser.name}
                                onChange={handleChange}
                                placeholder="Name"
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            />
                        </div>
                        <div className="mb-4">
                            <input
                                type="text"
                                name="title"
                                value={editedUser.title}
                                onChange={handleChange}
                                placeholder="Title"
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            />
                        </div>
                        <div className="mb-4">
                            <textarea
                                name="bio"
                                value={editedUser.bio}
                                onChange={handleChange}
                                placeholder="Bio"
                                rows="4"
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            />
                        </div>
                    </div>
                ) : (
                    <div>
                        <h2 className="text-2xl font-semibold text-gray-800">{user.name}</h2>
                        <p className="text-sm text-gray-600">{user.title}</p>
                        <div className="mt-4">
                            <p className="text-sm text-gray-700">{user.bio}</p>
                        </div>
                    </div>
                )}
            </div>

            <div className="flex flex-wrap justify-center gap-4 mt-6">
                {isEditing ? (
                    <>
                        <Button
                            onClick={handleSaveProfile}
                            type="primary"
                            className="px-6 py-2"
                        >
                            Save
                        </Button>
                        <Button
                            onClick={handleCancelEdit}
                            className="px-6 py-2"
                        >
                            Cancel
                        </Button>
                    </>
                ) : (
                    <Button
                        onClick={handleEditProfile}
                        type="primary"
                        className="px-6 py-2"
                    >
                        Edit Profile
                    </Button>
                )}
                <Button
                    onClick={handleLogout}
                    className="px-6 py-2 bg-gray-500 hover:bg-gray-600"
                >
                    Logout
                </Button>
            </div>
        </div>
    );
};

export default Channels;
