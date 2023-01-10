const mongoose = require('mongoose');

const movieSchema = mongoose.Schema({
    _id: {
        type: String
    },
    adult: {
        type: Boolean
    }, 
    backdrop_path : {
        type: String
    },
    belongs_to_collection : {
        type: Object
    },
    budget : {
        type: Number
    },
    genres : {
        type: Array
    }, 
    original_language: {
        type: String
    },
    original_title: {
        type: String
    },
    overview: {
        type: String
    },
    popularity: {
        type: Number
    },
    poster_path: {
        type: String
    },
    production_companies: {
        type: Array
    },
    production_countries: {
        type: Array
    },
    release_date: {
        type: Date
    },
    revenue: {
        type: Number
    },
    runtime: {
        type: Number
    },
    spoken_languages: {
        type: Array
    },
    status: {
        type: String
    },
    title: {
        type: String
    },
    video: {
        type: Boolean
    },
    vote_average: {
        type: Number
    },
    vote_count: {
        type: Number
    }
}, { timestamps: true});

const Movie = mongoose.model('Movie', movieSchema);

module.exports = { Movie }