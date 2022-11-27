import mongoose from 'mongoose';
[
    {
        "username": "admin",
        "email": "admin@testuniversity.edu",
        "password": "password",
        "bio": "Hi I am admin",
        "comments": [],
        "bookmarks": [],
        "friends": [],
        "loggedIn": false,
        "university": "Test University",
        "major": "Computer Science",
        "admin": true,
        "verified": true
    }
]

const User = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    created: {
        type: Date,
        default: Date.now,
    },
    updated: {
        type: Date,
        default: Date.now,
    },
    bio: {
        type: String,
        default: ''
    },
    comments: {
        type: [mongoose.Schema.Types.ObjectId], // Array of comment ids
        default: []
    },
    bookmarks: {
        type: [mongoose.Schema.Types.ObjectId], // Array of bookmark ids
        default: []
    },
    friends: {
        type: [mongoose.Schema.Types.ObjectId], // Array of user ids
        default: []
    },
    loggedIn: {
        type: Boolean,
        default: false
    },
    university: {
        type: String,
        default: ''
    },
    major: {
        type: String,
        default: ''
    },
    admin: {
        type: Boolean,
        default: false
    },
    verified: {
        type: Boolean,
        default: false
    }
}, { collection: 'Users' });

const UserModel = mongoose.model('User', User);

export default UserModel;