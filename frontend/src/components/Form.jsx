import React from 'react';
import { FaDog } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import { RiDeleteBackLine } from "react-icons/ri";

const UserForm = ({ handleSubmit, name, setName, nickname, setNickname, age, setAge, description, setDescription, addFriend, setAddFriend, users, handleFriendSelect, handleRemoveFriend }) => {
    console.log("addFriend:", addFriend);
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="name">Name:</label>
                <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor="nickname">Nickname:</label>
                <input
                    type="text"
                    id="nickname"
                    value={nickname}
                    onChange={(e) => setNickname(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor="age">Age:</label>
                <input
                    type="number"
                    id="age"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor="description">Description:</label>
                <textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor="friend">Add new <FaDog /> Friend:</label>
                <select
                    id="friend"
                    value={addFriend}
                    onChange={(e) => handleFriendSelect(e.target.value)}>
                    <option value="">Select a friend</option>
                    {users.map(user => (
                        <option key={user._id} value={user._id}>{user.name}</option>
                    ))}
                </select>
                <div>
                    <h3>Selected Friends:</h3>
                    <ul>
                        {addFriend.map(friendId => {
                            const friend = users.find(user => user._id === friendId);
                            console.log("friendId:", friendId);
                            console.log("friend:", friend);
                            console.log("users:", users);
                            return (
                                <li key={friendId}>
                                    <Link to={`/profile/${friendId}`} className={`user-link ${friend && friend.isPresent ? "user-present" : "not-present"}`}>
                                        @{friend?.nickname}
                                    </Link>
                                    <button className="form-btn-delete" type="button" onClick={() => handleRemoveFriend(friendId)}>
                                        <RiDeleteBackLine />
                                    </button>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>
            <button className='form-btn' type="submit">Save</button>
        </form>
    );
};

export default UserForm;

