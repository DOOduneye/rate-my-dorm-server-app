import * as UserDAO from './UserDAO.js';

const findUsers = async (req, res) => {
    const users = await UserDAO.findUsers();
    res.json(users);
}

const findUserByUsername = async (req, res) => {
    const user = await UserDAO.findUserByUsername(req.params.username);
    res.json(user);
}

const findUserById = async (req, res) => {
    const user = await UserDAO.findUserById(req.params.id);
    res.json(user);
}

const createUser = async (req, res) => {
    try {
        const user = await UserDAO.createUser(req.body);
        res.json(user);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const deleteUser = async (req, res) => {
    const user = await UserDAO.deleteUser(req.params.uid);
    res.json(user);
}

const updateUser = async (req, res) => {
    const user = await UserDAO.updateUser(req.params.uid, req.body);
    res.json(user);
}

const addToFriendList = async (req, res) => {
    const user = await UserDAO.appendToFriendList(req.params.uid, req.body.friend);
    res.json(user);
}

const removeFromFriendList = async (req, res) => {
    const user = await UserDAO.removeFromFriendList(req.params.uid, req.body.friend);
    res.json(user);
}

const UserController = (app) => {
    app.get('/api/users', findUsers);
    app.get('/api/users/:username', findUserByUsername);
    app.get('/api/users/id/:id', findUserById);
    app.post('/api/users', createUser);
    app.delete('/api/users/:uid', deleteUser);
    app.put('/api/users/:uid', updateUser);
    app.put('/api/users/friends/:uid', addToFriendList);
    app.delete('/api/users/friends/:uid', removeFromFriendList);
}

export default UserController;



