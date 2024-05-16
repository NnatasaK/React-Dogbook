import React, { createContext, useContext, useState } from "react";
import axios from 'axios';

const userContext = createContext();

export const UserProvider = ({ children }) => {
    const [users, setUsers] = useState([]);
    const [userProfile, setUserProfile] = useState([]);

    const fetchUser = async (userId) => { // Change id to userId
        try {
            const response = await axios.get(`http://localhost:8000/users/${userId}`); // Use userId
            setUserProfile(response.data);
            return response;
        } catch (error) {
            console.error('Error fetching user:', error);
        }
    };

    const fetchUsers = async () => {
        try {
            const response = await axios.get('http://localhost:8000/users');
            setUsers(response.data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const createUser = async (userData) => {
        try {
            await axios.post('http://localhost:8000/users', userData);
            fetchUsers(); // Refresh user list after creating a new user
        } catch (error) {
            console.error('Error creating user:', error);
        }
    };

    const editUser = async (userId, userData) => {
        try {
            await axios.patch(`http://localhost:8000/users/${userId}`, userData);
            fetchUsers();
        } catch (error) {
            console.error('Error editing user:', error);
        }
    };

    const deleteUser = async (userId) => {
        try {
            await Promise.all(
                users.map(async (user) => {
                    if (user.friendsList.includes(userId)) {
                        await axios.delete(`http://localhost:8000/users/${user._id}/friends/${userId}`);
                    }
                })
            );

            // Delete user
            await axios.delete(`http://localhost:8000/users/${userId}`);
            fetchUsers();
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    const deleteFriend = async (userId, friendId) => {
        try {
            await axios.delete(`http://localhost:8000/users/${userId}/friends/${friendId}`);
            fetchUser(userId); // Refresh current user's data after deleting friend
        } catch (error) {
            console.error('Error deleting friend:', error);
        }
    };

    return (
        <userContext.Provider value={{ userProfile, users, fetchUser, fetchUsers, createUser, editUser, deleteUser, deleteFriend }}>
            {children}
        </userContext.Provider>
    );
};

export const useAPI = () => useContext(userContext);
