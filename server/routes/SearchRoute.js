import express from "express";
import { User } from '../models/UserProfile.mjs'


const router = express.Router();


router.get('/search', async (req, res) => {

    let query = req.query.q;
    query = String(query || '').trim().toLowerCase();

    try {

        const users = await User.find(); // Use .lean() to ensure plain JavaScript objects are returned (?)

        const filteredUsers = users.filter(user => user.name && user.name.toLowerCase().includes(query));

        console.log(filteredUsers);
        res.status(200).json(filteredUsers);

    } catch (error) {
        console.error('Error searching users:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});



export default router;