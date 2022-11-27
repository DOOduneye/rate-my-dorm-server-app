import Comment from './Comment.js';

export const findComments = () => Comment.find();
export const findCommentById = (id) => Comment.find({ _id: id });
export const findCommentsByIds = (ids) => Comment.find({ _id: { $in: ids } });
export const createComment = (comment) => Comment.create(comment);
export const createReply = async (cid, comment) => {
    const newComment = await createComment(comment);
    return Comment.updateOne({ _id: cid }, { $addToSet: { replies: newComment._id } });
}

export const deleteComment = (id) => Comment.deleteOne({ _id: id });