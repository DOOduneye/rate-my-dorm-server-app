import * as CommentDAO from './CommentDAO.js';

const findComments = async (req, res) => {
    const comments = await CommentDAO.findComments();
    res.json(comments);
}

const findCommentById = async (req, res) => {
    const comment = await CommentDAO.findCommentById(req.params.cid);
    res.json(comment);
}

const findReplies = async (req, res) => {
    const comment = await CommentDAO.findCommentById(req.params.cid);
    const replies = await CommentDAO.findCommentsByIds(comment[0].replies);
    res.json(replies);
}

const createComment = async (req, res) => {
    const comment = await CommentDAO.createComment(req.body);
    res.json(comment);
}

const createReply = async (req, res) => {
    console.log(req.body);
    console.log(req.params.cid);
    const comment = await CommentDAO.createReply(req.params.cid, req.body);
    res.json(comment);
}

const deleteComment = async (req, res) => {
    const comment = await CommentDAO.deleteComment(req.params.cid);
    res.json(comment);
}

const CommentController = (app) => {
    app.get('/api/comments', findComments);
    app.get('/api/comments/:cid', findCommentById);
    app.get('/api/comments/replies/:cid', findReplies);
    app.post('/api/comments/', createComment);
    app.post('/api/comments/reply/:cid', createReply);
    app.delete('/api/comments/:cid', deleteComment);
}

export default CommentController;



