import { useState } from 'react';

export const useFormState = () => {
    const [name, setName] = useState('');
    const [nickname, setNickname] = useState('');
    const [age, setAge] = useState('');
    const [description, setDescription] = useState('');
    const [addFriend, setAddFriend] = useState([]);

    return {
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
    };
};
