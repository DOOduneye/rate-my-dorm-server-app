import express from 'express';
import cors from 'cors';
import mongoose from "mongoose";
import dotenv from 'dotenv';
import expressSession from 'express-session';

import UserController from './User/UserController.js';
import SchoolController from './School/SchoolController.js';
import DormController from './Dorm/DormController.js';
import CommentController from './Comment/CommentController.js';
import SearchController from './Search/SearchController.js';

const app = express();

if (process.env.ENV === 'production') {
    // app.set('trust proxy', 1)
    // sess.cookie.secure = true;
} else {
    dotenv.config();
}

// app.set('trust proxy', 1);
app.use(expressSession({
    secret: "secrets",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Make true when deploying to production
}));

// let sess = {
//     secret: 'secrets',
//     cookie: { secure: false }
// };

const CONNECTION_STRING = 'mongodb://localhost:27017/rmd';
mongoose.connect(CONNECTION_STRING)
.then(() => {
    console.log('Connected to MongoDB');
}).catch((error) => {
    console.log('Error connecting to MongoDB:', error.message);
    return process.exit(1);
});

app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));

UserController(app);
SchoolController(app);
DormController(app);
CommentController(app);
SearchController(app);

app.listen(process.env.PORT || 4000);