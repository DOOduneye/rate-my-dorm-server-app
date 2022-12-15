import mongoose from "mongoose";
[
    {
        "createdBy": "638183bf53dfecaae5f64261",
        "text": "Horrible dorms",
        "date": "2021-05-01T00:00:00.000Z",
        "dorm": "6381b0d053dfecaae5f64274",
    }
]

const Comment = mongoose.Schema({
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true,
        default: Date.now
    },
    dorm: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
}, { collection: 'Comments' });

const CommentModel = mongoose.model('Comment', Comment);

export default CommentModel;

