import * as SchoolDAO from './SchoolDAO.js';

const findSchools = async (req, res) => {
    const schools = await SchoolDAO.findSchools();
    res.json(schools);
}

const findSchoolByName = async (req, res) => {
    const school = await SchoolDAO.findSchoolByName(req.params.name);
    res.json(school);
}

const findSchoolById = async (req, res) => {
    const school = await SchoolDAO.findSchoolById(req.params.id);
    res.json(school);
}

const SchoolController = (app) => {
    app.get('/api/schools', findSchools);
    app.get('/api/schools/:name', findSchoolByName);
    app.get('/api/schools/id/:id', findSchoolById);
}

export default SchoolController;



