// routes/podcast.js
const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

function extractSpotifyEpisodeId(url) {
    const regex = /episode\/([a-zA-Z0-9]+)/;
    const match = url.match(regex);
    return match ? match[1] : null;
}

// Render the podcast page
router.get('/podcast', async (req, res) => {
    const podcasts = await Post.find({ type: 'podcast' }); // Get only 'podcast' type
    res.render('podcast', { podcasts });
});

module.exports = router;
