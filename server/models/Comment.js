const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
    writer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    movieId: {
        type: String
    },
    content: {
        type: String,
    }
},    { timestamps: true});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = { Comment }