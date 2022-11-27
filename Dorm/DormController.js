import * as DormDAO from './DormDAO.js';
import * as SchoolDAO from '../School/SchoolDAO.js';

const findDorms = async (req, res) => {
    const dorms = await DormDAO.findDorms();
    res.json(dorms);
}

const findDormsBySchool = async (req, res) => {
    const school = await SchoolDAO.findSchoolByName(req.params.name);
    const dorms = await DormDAO.findDormsBySchool(school[0]._id);
    res.json(dorms);
}

const findDormById = async (req, res) => {
    const dorm = await DormDAO.findDormById(req.params.id);
    res.json(dorm);
}

const createDorm = async (req, res) => {
    const school = await SchoolDAO.findSchoolByName(req.body.university);
    const dorm = await DormDAO.createDorm(req.body, school[0]._id);
    res.json(dorm);
}

const findDormByName = async (req, res) => {
    const dorm = await DormDAO.findDormByName(req.params.name);
    res.json(dorm);
}

const appendToCommentList = async (req, res) => {
    const dorm = await DormDAO.appendToCommentList(req.params.did, req.body.comment);
    res.json(dorm);
}

const updateRating = async (req, res) => {
    const dorm = await DormDAO.findDormById(req.params.did);

    const numRatings = dorm[0].rating.numRatings + 1;
    const rating = Math.round((dorm[0].rating.overall * dorm[0].rating.numRatings + req.body.rating) / numRatings * 10) / 10;
    const updatedDorm = await DormDAO.updateRating(req.params.did, rating, numRatings);
    res.json(updatedDorm);
}

const DormController = (app) => {
    app.get('/api/dorms', findDorms);
    app.get('/api/dorms/id/:id', findDormById);
    app.get('/api/dorms/:name', findDormByName);
    app.get('/api/dorms/school/:name', findDormsBySchool);
    // app.post('/api/dorms/school/:id', createDorm);
    app.put('/api/dorms/comments/:did', appendToCommentList);
    app.put('/api/dorms/rating/:did', updateRating);
}

export default DormController;



