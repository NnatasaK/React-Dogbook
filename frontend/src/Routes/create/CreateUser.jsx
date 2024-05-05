import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserForm from '../../components/Form';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useFormState } from '../../components/UserForm';
import { FaDog } from "react-icons/fa6";
import { RiDeleteBackLine } from "react-icons/ri";
import { TiArrowBackOutline } from "react-icons/ti";

const Create = () => {
    const { name, setName, nickname, setNickname, age, setAge, description, setDescription, addFriend, setAddFriend } = useFormState();
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {

        try {
            const response = await axios.get('http://localhost:8000/users');
            setUsers(response.data);
        } catch (error) {
            console.error('Error fetching users:', error);
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
            await axios.post('http://localhost:8000/users', {
                name,
                nickname,
                age: parseInt(age),
                description,
                friendsList: addFriend
            });
            navigate('/');
        } catch (error) {
            console.error('Error creating user:', error);
        }
    };

    return (

        <div>
            <div className="go-back">
                <TiArrowBackOutline />
                <Link className='link-go-back' to={'/'}>Back to Homepage</Link>
            </div>
            <div className='form'>
                <h2>Create <FaDog /> Profile</h2>
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

export default Create;

