import * as CommentDAO from './CommentDAO.js';

const findComments = async (req, res) => {
    const comments = await CommentDAO.findComments();
    res.json(comments);
}

const findCommentById = async (req, res) => {
    const comment = await CommentDAO.findCommentById(req.params.cid);
    res.json(comment);
}

const findCommentsByDorm = async (req, res) => {
    const comments = await CommentDAO.findCommentsByDormId(req.params.did);
    res.json(comments);
}

const createComment = async (req, res) => {
    const comment = await CommentDAO.createComment(req.body);
    res.json(comment);
}

const deleteComment = async (req, res) => {
    const comment = await CommentDAO.deleteComment(req.params.cid);
    res.json(comment);
}

const CommentController = (app) => {
    app.get('/api/comments', findComments);
    app.get('/api/comments/:cid', findCommentById);
    app.get('/api/comments/dorm/:did', findCommentsByDorm);
    app.post('/api/comments/', createComment);
    app.delete('/api/comments/:cid', deleteComment);
}

export default CommentController;



