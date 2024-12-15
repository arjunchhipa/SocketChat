const mongoose = require('mongoose');
import { v4 as uniqueId } from "uuid";

const userSchema = new mongoose.Schema({
    Username: {
        type: String,
        required: true,
        trim: true, 
    },
    Email: {
        type: String,
        required: true,
        unique: true, 
        trim: true,
        match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, 
    },
    Password: {
        type: String,
        required: true,
    },
    Room : {
        type: String,
        default: uniqueId,
         unique: true
    }
});

const USERS = mongoose.model('User', userSchema);

module.exports = USERS;