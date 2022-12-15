import Comment from './Comment.js';
import mongoose from 'mongoose';

export const findComments = () => Comment.find();
export const findCommentById = (id) => Comment.find({ _id: id });
export const findCommentsByDormId = (id) => Comment.find({ dorm : mongoose.Types.ObjectId(id) });
export const createComment = (comment) => Comment.create(comment);
export const deleteComment = (id) => Comment.deleteOne({ _id: id });