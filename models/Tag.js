const mongoose = require('mongoose');

const tagSchema = mongoose.Schema({
    reviewId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Review'    
    },
    tagName: {
        type: String
    }
},    { timestamps: true});

const Tag = mongoose.model('Tag', tagSchema);

module.exports = { Tag }