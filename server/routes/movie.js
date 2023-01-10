const express = require('express');
const router = express.Router();
const { Movie } = require('../models/Movie');

router.post('/addToMovie', (req, res) => {
    const movie = new Movie(req.body)
    movie.save((err) => {
        if(err) return res.status(400).send(err)
        return res.status(200).json({ success: true })
    })
})

module.exports = router;
