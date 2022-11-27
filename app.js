import express from 'express';
import cors from 'cors';
import mongoose from "mongoose";
import dotenv from 'dotenv';

import UserController from './User/UserController.js';
import SchoolController from './School/SchoolController.js';
import DormController from './Dorm/DormController.js';
import CommentController from './Comment/CommentController.js';

if (process.env.NODE_ENV !== 'production') {
    dotenv.config();
}

const app = express();
const CONNECTION_STRING = 'mongodb://localhost:27017/rmd';
mongoose.connect(CONNECTION_STRING)
.then(() => {
    console.log('Connected to MongoDB');
}).catch((error) => {
    console.log('Error connecting to MongoDB:', error.message);
    return process.exit(1);
});

app.use(express.json());
app.use(cors());

UserController(app);
SchoolController(app);
DormController(app);
CommentController(app);

app.listen(process.env.PORT || 4000);