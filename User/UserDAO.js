import UserModel from './User.js';

export const findUsers = () => UserModel.find();
export const findUserByUsername = (username) => UserModel.findOne( { username: username } );
export const findUserById = (id) => UserModel.find({ _id: id } );
export const findUserByCredentials = (email, password) => UserModel.find({ email: email, password: password});
export const createUser = (user) => UserModel.create(user);
export const deleteUser = (uid) => UserModel.deleteOne({ _id: uid });
export const updateUser = (uid, user) => UserModel.updateOne({ _id: uid }, { $set: user });
export const appendToBookmarkList = (uid, bookmark) => UserModel.updateOne({ _id: uid }, { $push: { bookmarks: bookmark } });
export const removeFromBookmarkList = (uid, bookmark) => UserModel.updateOne({ _id: uid }, { $pull: { bookmarks: bookmark } });
export const appendToFriendList = (uid, friend) => UserModel.updateOne({ _id: uid }, { $addToSet: { friends: friend } });
export const removeFromFriendList = (uid, friend) => UserModel.updateOne({ _id: uid }, { $pull: { friends: friend } });