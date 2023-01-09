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

router.post('/getReview', (req, res) => {
    Review.find(req.body)
        .exec((err, reviews) => {
            if(err) return res.status(400).send(err)
            return res.status(200).json({ success: true, reviews })
        })
})

router.post('/getTag', (req, res) => {
    Tag.find(req.body)
        .exec((err, tags) => {
            if(err) return res.status(400).send(err)
            return res.status(200).json({ success: true, tags })
        })
})

module.exports = router;
