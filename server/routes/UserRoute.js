import express from "express";
import { User } from '../models/UserProfile.mjs'


const router = express.Router();


// Get All Users
router.get("/users", async (req, res) => {
    try {
        const data = await User.find({})
        if (!data) {
            throw new Error('An error occurred while fetching data')
        }
        res.status(201).json(data);
    } catch (error) {
        res.status(500).json({ error: 'Error' })
    }
});

//Get User By Id
router.get("/users/:id", async (req, res) => {
    try {

        const userId = req.params.id;
        const data = await User.findById(userId).populate('friendsList');
        if (!data) {
            throw new Error('An error occurred while fetching data')
        }
        res.status(201).json(data);
    } catch (error) {
        res.status(500).json({ error: 'Error' })
    }
});

//Create New User
router.post("/users", async (req, res) => {
    try {
        const { name, nickname, age, description, friendsList } = req.body;

        if (!name || !nickname || !age || !description) {
            throw new Error('Missing required fields');
        }
        const friendId = req.body.friendsList[0];

        const data = await User.create({
            name,
            nickname,
            age,
            description,
            friendsList: friendsList
        });

        if (!data) {
            throw new Error('An error occurred while creating data');
        }

        res.status(201).json(data);
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ error: error.message });
    }
});

//Update User
router.patch("/users/:id", async (req, res) => {
    try {

        const userId = req.params.id;
        const { name, nickname, age, description, friendsList, isPresent } = req.body;

        if (isPresent !== undefined && typeof isPresent !== 'boolean') {
            return res.status(400).json({ error: 'isPresent must be a boolean' });
        }

        // The { new: true } option in Mongoose's findByIdAndUpdate method specifies that you want to return the modified document rather than the original one.
        const data = await User.findByIdAndUpdate(userId, { name, nickname, age, description, friendsList, isPresent }, { new: true });
        if (!data) {
            throw new Error('An error occurred while creating data')
        }
        res.status(201).json(data);
    } catch (error) {
        res.status(500).json({ error: 'Error' })
    }
});



//Delete User
router.delete("/users/:id", async (req, res) => {
    try {

        const userId = req.params.id;

        const data = await User.findByIdAndDelete(userId);
        if (!data) {
            throw new Error('An error occurred while creating data')
        }
        res.status(201).json(data);
    } catch (error) {
        res.status(500).json({ error: 'Error' })
    }
});

// Delete Friend from Users Friends List

router.delete("/users/:userId/friends/:friendId", async (req, res) => {
    try {
        const userId = req.params.userId;
        const friendId = req.params.friendId;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        user.friendsList.pull(friendId);


        await user.save();

        res.status(200).json({ message: 'Friend removed successfully' });
    } catch (error) {
        console.error('Error deleting friend:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});



export default router;

// NOTE: pay attention to routes! For example if i have two patch routes with the same endpoint only one will run