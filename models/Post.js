// models/Post.js
const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title: String,
    content: String,
    link: String,  // Spotify or YouTube link
    type: {        // 'podcast' or 'course'
        type: String,
        enum: ['podcast', 'course'],
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Post', postSchema);
