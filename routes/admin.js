// routes/admin.js
const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

function extractSpotifyEpisodeId(url) {
    const regex = /episode\/([a-zA-Z0-9]+)/;
    const match = url.match(regex);
    return match ? match[1] : null;
}

function extractYouTubeVideoId(url) {
    const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
}

// Admin Dashboard
router.get('/admin', async (req, res) => {
    const posts = await Post.find();  // Fetch all posts (both podcasts and courses)

    posts.forEach(post => {
        if (post.type === 'podcast' && post.link) {
            post.spotifyEpisodeId = extractSpotifyEpisodeId(post.link);
        } else if (post.type === 'course' && post.link) {
            post.videoId = extractYouTubeVideoId(post.link);
        }
    });

    res.render('admin', { posts });
});

module.exports = router;
