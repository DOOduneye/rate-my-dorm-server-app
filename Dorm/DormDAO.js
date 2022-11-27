import DormModel from "./Dorm.js";

export const findDorms = () => DormModel.find();
export const findDormsBySchool = (id) => DormModel.find({ university : id });
export const findDormById = (id) => DormModel.find({ _id : id });
export const findDormByName = (name) => DormModel.find({ name: name });
export const appendToCommentList = (did, comment) => DormModel.updateOne({ _id : did }, { $addToSet: { comments: comment } });
export const updateRating = (did, rating, numRatings) => DormModel.updateOne({ _id : did }, { rating: { overall: rating, numRatings: numRatings } });