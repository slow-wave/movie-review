const express = require('express');
const router = express.Router();
const { Review } = require('../models/Review');
const { Tag } = require('../models/Tag');

router.post('/submit', (req, res) => {
    const review = new Review(req.body)

    review.save(async (err) => {
        try {
            res.status(200).json({ success: true })  
            const Reviews = await Review.find({"movieId": req.body.movieId, "writer": req.body.writer})
            let tagItems = req.body.tags.map(item => {
                return {
                    reviewId: Reviews[0]._id,
                    tagName: item
                };
            });
            await Tag.insertMany(tagItems)
        } catch {
            res.status(400).send(err)
        }
    })
})

module.exports = router;
