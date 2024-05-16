import React, { useEffect, useState } from 'react';
import axios from 'axios';
import UserForm from '../../components/Form';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useFormState } from '../../components/UserForm';
import { FaDog } from "react-icons/fa6";
import { TiArrowBackOutline } from "react-icons/ti";
import { useAPI } from '../../userContext';

const Edit = () => {
    const { id } = useParams();
    const { users, fetchUsers, fetchUser, editUser, deleteFriend } = useAPI();
    const navigate = useNavigate();
    const {
        name,
        setName,
        nickname,
        setNickname,
        age,
        setAge,
        description,
        setDescription,
        addFriend,
        setAddFriend,
    } = useFormState();
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                await fetchUsers();
                const response = await fetchUser(id);
                if (response && response.data) {
                    const userData = response.data;
                    setUserData(userData);
                    setName(userData.name);
                    setNickname(userData.nickname);
                    setAge(userData.age);
                    setDescription(userData.description);
                    /*  setAddFriend(userData.friendsList); */
                    console.log("userData:", userData);
                } else {
                    console.error('Empty response received');
                }
            } catch (error) {
                console.error('Error fetching user profile:', error);
            }
        };
        fetchData();
    }, [id]);


    const handleFriendSelect = (friendId) => {
        if (!addFriend.includes(friendId)) {
            setAddFriend([...addFriend, friendId]);
        }
    };

    const handleRemoveFriend = (friendId) => {
        setAddFriend(addFriend.filter(id => id !== friendId));
        deleteFriend(id, friendId);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await editUser(id, {
                name,
                nickname,
                age: parseInt(age),
                description,
                friendsList: addFriend
            });
            navigate(`/profile/${id}`);
        } catch (error) {
            console.error('Error updating user profile:', error);
        }
    };

    if (!userData) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <div className="go-back">
                <TiArrowBackOutline />
                <Link className='link-go-back' to={'/'}>Back to Homepage</Link>
            </div>
            <div className='form'>
                <h2>Edit <FaDog /> Profile</h2>
                <UserForm
                    handleSubmit={handleSubmit}
                    name={name}
                    setName={setName}
                    nickname={nickname}
                    setNickname={setNickname}
                    age={age}
                    setAge={setAge}
                    description={description}
                    setDescription={setDescription}
                    addFriend={addFriend}
                    setAddFriend={setAddFriend}
                    users={users}
                    handleFriendSelect={handleFriendSelect}
                    handleRemoveFriend={handleRemoveFriend}
                />
            </div>
        </div>
    );
};

export default Edit;


/* import React, { useEffect, useState } from 'react';
import axios from 'axios';
import UserForm from '../../components/Form';
import { Link } from 'react-router-dom';
import { useParams, useNavigate } from 'react-router-dom';
import { useFormState } from '../../components/UserForm';
import { RiDeleteBackLine } from "react-icons/ri";
import { FaDog } from "react-icons/fa6";
import { TiArrowBackOutline } from "react-icons/ti";



const Edit = () => {
    const { id } = useParams();
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();
    const {
        name,
        setName,
        nickname,
        setNickname,
        age,
        setAge,
        description,
        setDescription,
        addFriend,
        setAddFriend,
    } = useFormState();
    const [userData, setUserData] = useState(null);

    const fetchUsers = async () => {

        try {
            const response = await axios.get('http://localhost:8000/users');
            setUsers(response.data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };


    useEffect(() => {
        fetchUserProfile();
        fetchUsers();
    }, [id]);

    const fetchUserProfile = async () => {
        try {
            const response = await axios.get(`http://localhost:8000/users/${id}`);
            const userData = response.data;
            setUserData(userData);
            setName(userData.name);
            setNickname(userData.nickname);
            setAge(userData.age);
            setDescription(userData.description);
            setAddFriend(userData.friendsList);

        } catch (error) {
            console.error('Error fetching user profile:', error);
        }
    };

    const handleFriendSelect = (friendId) => {
        if (!addFriend.includes(friendId)) {
            setAddFriend([...addFriend, friendId]);
        }
    };

    const handleRemoveFriend = (friendId) => {
        setAddFriend(addFriend.filter(id => id !== friendId));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.patch(`http://localhost:8000/users/${id}`, {
                name,
                nickname,
                age: parseInt(age),
                description,
                friendsList: addFriend
            });
            navigate(`/profile/${id}`);
        } catch (error) {
            console.error('Error updating user profile:', error);
        }
    };

    if (!userData) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <div className="go-back">
                <TiArrowBackOutline />
                <Link className='link-go-back' to={'/'}>Back to Homepage</Link>
            </div>
            <div className='form'>
                <h2>Edit <FaDog /> Profile</h2>
                <UserForm
                    handleSubmit={handleSubmit}
                    name={name}
                    setName={setName}
                    nickname={nickname}
                    setNickname={setNickname}
                    age={age}
                    setAge={setAge}
                    description={description}
                    setDescription={setDescription}
                    addFriend={addFriend}
                    setAddFriend={setAddFriend}
                    users={users}
                    handleFriendSelect={handleFriendSelect}
                    handleRemoveFriend={handleRemoveFriend}
                />
            </div>
        </div>

    );
};

export default Edit; */