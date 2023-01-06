const mongoose = require('mongoose');

const reviewSchema = mongoose.Schema({
    writer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    movieId: {
        type: String
    },
    mainContent: {
        type: String
    },
    comment: {
        type: String
    }
},    { timestamps: true});

const Review = mongoose.model('Review', reviewSchema);

module.exports = { Review }