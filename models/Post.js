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
<<<<<<< HEAD
    },
    VideoId: String,
    videoType: String
=======
    }
>>>>>>> 5c64ad7d335ec1c6cbad6af605c00cc65055c806
});

module.exports = mongoose.model('Post', postSchema);
