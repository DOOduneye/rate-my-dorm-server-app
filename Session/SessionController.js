import * as UserDAO from "../User/UserDAO.js";

const login = async (req, res) => {
    const user = req.body
    const username = user.username;
    const password = user.password;
    const existingUser = await UserDAO.findUserByCredentials(username, password);
    if (existingUser) {
        existingUser.password = ''; 
        req.session['profile'] = existingUser; ``
        res.json(existingUser);
    } else {
        res.sendStatus(403);
    }
}

const logout = (req, res) => {
    req.session.destroy();
    res.sendStatus(200);
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

const profile = (req, res) => {
    res.json(req.session['profile']); 
}

const setSession = (req, res) => {
    var name = req.params['name'];
    var value = req.params['value'];
    req.session[name] = value;
    res.send(req.session);
} 

const getSession = (req, res) => {
    var name = req.params['name'];
    var value = req.session[name];
    res.send(value);
 }
 

const SessionController = (app) => {
    app.post("/api/auth/login", login);
    app.post("/api/auth/signup", signup);
    app.post("/api/auth/profile", profile);
    app.post("/api/auth/logout", logout);
}

export default SessionController;