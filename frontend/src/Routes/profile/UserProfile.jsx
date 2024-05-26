import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link, useNavigate } from 'react-router-dom';
import './UserProfile.css';
import { TiArrowBackOutline } from "react-icons/ti";
import { RiDeleteBackLine } from "react-icons/ri";
import { useAPI } from '../../userContext';

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

const Profile = ({ }) => {

    const [isPresent, setIsPresent] = useState(false);
    /*  const [userProfile, setUserProfile] = useState(null); */
    const { fetchUser, userProfile, deleteUser, deleteFriend } = useAPI();
    const [profilePhoto, setProfilePhoto] = useState(null);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        fetchUser(id);
    }, [id]);

    useEffect(() => {
        if (userProfile) {
            setIsPresent(userProfile.isPresent);
        }
    }, [userProfile]);

    useEffect(() => {
        fetchProfilePhoto();
    }, []);

    const handleDeleteUser = async () => {
        try {
            await deleteUser(id);
            navigate('/');
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };
    /*    const fetchUserProfile = async () => {
           try {
   
               const response = await axios.get(`http://localhost:8000/users/${id}`);
               setUserProfile(response.data);
               setIsPresent(response.data.isPresent);
   
           } catch (error) {
               console.error('Error fetching user profile:', error);
           }
       }; */
    /* 
        const deleteUser = async () => {
            try {
                await axios.delete(`http://localhost:8000/users/${id}`);
                window.location.href = "/";
            } catch (error) {
                console.error('Error deleting user:', error);
            }
        };
    
        const deleteFriend = async (friendId) => {
            try {
                await axios.delete(`http://localhost:8000/users/${id}/friends/${friendId}`);
                setUserProfile(prevProfile => ({
                    ...prevProfile,
                    friendsList: prevProfile.friendsList.filter(user => user._id !== friendId)
                }));
            } catch (error) {
                console.error('Error deleting friend:', error);
            }
        }; */
    const fetchProfilePhoto = async () => {
        try {
            const response = await axios.get('https://dog.ceo/api/breeds/image/random');
            const randomDogImageUrl = response.data.message;
            setProfilePhoto(randomDogImageUrl);
        } catch (error) {
            console.error('Error fetching random dog image:', error);
        }
    }
    const handlePresenceChange = async () => {
        try {

            const updatedPresence = !isPresent;
            setIsPresent(updatedPresence);
            await axios.patch(`${apiBaseUrl}/users/${id}`, { isPresent: updatedPresence });
        } catch (error) {
            console.error('Error updating presence status:', error);
        }
    };

    if (!userProfile || !profilePhoto) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <div className="go-back">
                <TiArrowBackOutline />
                <Link className='link-go-back' to={'/'}>Back to Homepage</Link>
            </div>
            <div className="profile-container">

                <div className='profile-photo-container'>
                    <img className='profile-photo' src={profilePhoto} alt="Profile Photo" />
                </div>

                <div className="info">

                    <div className="info-top">

                        <h1>{userProfile.name}</h1>
                        <label>
                            {/* Present: */}
                            <input
                                type="checkbox"
                                checked={isPresent}
                                onChange={handlePresenceChange}
                            />
                        </label>
                        <span>(check if present)</span>
                    </div>
                    <div className="info-bottom">

                        <p>Nickname: @{userProfile.nickname}</p>
                        <p>Age: {userProfile.age}</p>
                        <p> {userProfile.description}</p>
                        <p>Friends:</p>
                        <ul>
                            {userProfile.friendsList.map(user => (
                                <li key={user._id}>
                                    <Link to={`/profile/${user._id}`} className={`user-link ${user.isPresent ? "user-present" : "not-present"}`}>@{user.nickname}</Link>
                                    <button className='btn-delete' onClick={() => deleteFriend(id, user._id)}>
                                        <RiDeleteBackLine />
                                    </button>
                                </li>
                            ))}
                        </ul>
                        <button className='profile-btn'>
                            <Link to={`/edit/${userProfile._id}`}>Edit</Link>
                        </button>
                        <button className='profile-btn-delete' onClick={handleDeleteUser}>
                            Delete
                        </button>
                    </div>

                </div>

            </div>


        </div>
    );
};

export default Profile;

