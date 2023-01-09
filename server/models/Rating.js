const mongoose = require('mongoose');

const ratingSchema = mongoose.Schema({
    reviewId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Review'    
    },
    ratingTotal: {
        type: Number
    },
    ratingAgain: {
        type: Number
    },
    ratingSad: {
        type: Number
    },
    ratingTouching: {
        type: Number
    },
    ratingFun: {
        type: Number
    }
},    { timestamps: true});

const Rating = mongoose.model('Rating', ratingSchema);

module.exports = { Rating }