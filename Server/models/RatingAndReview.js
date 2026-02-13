const mongoose = require('mongoose');

const ratingAndReview = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    rating:{
        type:Number,
        required: true
    },
    review:{
        type: String,
        required: true
    },
    courses: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Courses",
        indes: true,
    },
});

module.exports = mongoose.model("RatingAndReview",ratingAndReview);