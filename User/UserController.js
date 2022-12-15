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

const addToBookmarkList = async (req, res) => {
    const user = await UserDAO.appendToBookmarkList(req.params.uid, req.body.bookmark);
    res.json(user);
}

const removeFromBookmarkList = async (req, res) => {
    const user = await UserDAO.removeFromBookmarkList(req.params.uid, req.body.bookmark);
    res.json(user);
}

const addToFriendList = async (req, res) => {
    const user = await UserDAO.appendToFriendList(req.params.uid, req.body);
    res.json(user);
}

const removeFromFriendList = async (req, res) => {
    const user = await UserDAO.removeFromFriendList(req.params.uid, req.body);
    res.json(user);
}

const getCurrentUser = async (req, res) => {
    if (!req.session['profile'] || req.session['profile'] === []) {
        res.sendStatus(403);
        return;
    }
    console.log('getCurrentUser', req.session['profile'])
    res.json(req.session['profile']);
}

const login = async (req, res) => {
    const user = req.body
    const email = user.email;
    const password = user.password;
    const existingUser = await UserDAO.findUserByCredentials(email, password);
    console.log('login', existingUser)
    if (existingUser && existingUser.length !== 0) {
        existingUser.password = ''; 
        req.session['profile'] = existingUser; 
        res.json(existingUser);
    } else {
        res.sendStatus(403);
    }
}

const logout = (req, res) => {
    const session = req.session;
    if (session) {
        session.destroy();
    }
    res.send(session);
}

const signup = async (req, res) => {
    const newUser = req.body;
    const existingUser = await UserDAO.findUserByUsername(req.body.username);
    if (existingUser) {
        res.sendStatus(403);
        return;
    } else {
        const insertedUser = await UserDAO.createUser(newUser);
        insertedUser.password = '';
        req.session['profile'] = insertedUser;
        res.json(insertedUser);
    }   
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
    app.put('/api/users/bookmarks/:uid', addToBookmarkList);
    app.delete('/api/users/bookmarks/:uid', removeFromBookmarkList);

    app.get('/api/auth/profile', getCurrentUser);
    app.post("/api/auth/login", login);
    app.post("/api/auth/signup", signup);
    app.get("/api/auth/logout", logout);
}

export default UserController;



