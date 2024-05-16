import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../index.css';
import { TiUserDeleteOutline } from "react-icons/ti";
import { RiDeleteBackLine } from "react-icons/ri";
import { FaDog } from "react-icons/fa6";
import { MdOutlinePets } from "react-icons/md";
import Search from '../Routes/search/Search.jsx';
import { useAPI } from '../userContext.jsx';


const UsersList = () => {
  const { users, fetchUsers, deleteUser } = useAPI();

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleDeleteUser = async (userId) => {
    try {
      await deleteUser(userId);
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  /*  const fetchUsers = async () => {
 
     try {
       const response = await axios.get('http://localhost:8000/users');
       setUsers(response.data);
     } catch (error) {
       console.error('Error fetching users:', error);
     }
   };
  */
  /*   const deleteUser = async (userId) => {
      try {
        console.log(userId);
        await axios.delete(`http://localhost:8000/users/${userId}`);
        setUsers(users.filter(user => user._id !== userId));
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    };
   */
  return (
    <div className='users-list'>
      <Search />

      <ul>
        {users.slice(0, 10).map(user => ( // Slice users array to only include first 10 users
          <li key={user._id}>
            <Link to={`/profile/${user._id}`} className={`user-link ${user.isPresent ? "user-present" : "not-present"}`}>@{user.nickname}</Link>
            <button className='btn-delete' onClick={() => handleDeleteUser(user._id)}>
              <RiDeleteBackLine />
            </button>
          </li>
        ))}
      </ul>
      <button className='btn-home'>
        <Link className='link-home' to="/create">Create New <MdOutlinePets className='dog-icon' /> </Link>
      </button>

    </div>
  );
};

export default UsersList
