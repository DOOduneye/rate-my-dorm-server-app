import SchoolModel from './School.js';

export const findSchools = () => SchoolModel.find();
export const findSchoolById = (id) => SchoolModel.find({ _id : id });
export const findSchoolByName = (name) => SchoolModel.find({ name: name });
export const appendToDormList = (sid, dorm) => SchoolModel.updateOne({ _id: sid }, { $addToSet: { dorms: dorm } });