

import Mongoose from "mongoose";
const Schema = Mongoose.Schema;

const userProfileSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    nickname: {
        type: String,
        required: true,
        unique: true
    },
    age: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    isPresent: {
        type: Boolean,
        default: false
    },
    friendsList: [{
        type: Schema.Types.ObjectId,
        ref: 'UserProfile'
    }]

})



export const User = Mongoose.model('UserProfile', userProfileSchema);


