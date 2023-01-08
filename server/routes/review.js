const express = require('express');
const router = express.Router();
const { Review } = require('../models/Review');
const { Rating } = require('../models/Rating');

router.post('/submit', (req, res) => {
    const review = new Review(req.body)

    review.save((err) => {
        if(err) return res.status(400).send(err)
            Review.find({"movieId": req.body.movieId, "writer": req.body.writer})
            .exec(( err, info) => {
                if(err) return res.status(400).send(err)
                const rating = new Rating({
                    reviewId: info[0]._id,
                    writer: req.body.writer,
                    ratingTotal: req.body.ratingTotal
                })
                rating.save((err) => {
                    if(err) return res.status(400).send(err)
                    return res.status(200).json({ success: true })
                })
            })
        })
})

module.exports = router;
