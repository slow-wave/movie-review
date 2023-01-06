const express = require('express');
const router = express.Router();
const { Review } = require('../models/Review');

router.post('/submit', (req, res) => {
    const review = new Review(req.body)
    review.save((err, doc) => {
        if(err) return res.status(400).send(err)
        return res.status(200).json({ success: true })
    })
})

module.exports = router;
