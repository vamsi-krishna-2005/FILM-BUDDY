const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

// Function to extract Spotify episode/show ID from the URL
function extractSpotifyId(url) {
    const episodeRegex = /episode\/([a-zA-Z0-9]+)/;
    const showRegex = /show\/([a-zA-Z0-9]+)/;

    const episodeMatch = url.match(episodeRegex);
    const showMatch = url.match(showRegex);

    if (episodeMatch) {
        return { id: episodeMatch[1], type: 'episode' };
    } else if (showMatch) {
        return { id: showMatch[1], type: 'show' };
    } else {
        return null;  // Invalid link
    }
}

// Render the podcast page
router.get('/podcast', async (req, res) => {
    const podcasts = await Post.find({ type: 'podcast' });
    res.render('podcast', { podcasts });
});

// Route for uploading a new podcast
router.post('/podcast/upload', async (req, res) => {
    const { title, content, link } = req.body;
    const spotifyData = extractSpotifyId(link);

    if (!spotifyData) {
        return res.status(400).send('Invalid Spotify link');
    }

    const newPost = new Post({
        title,
        content,
        link,
        type: 'podcast',
        videoType: spotifyData.type,  // 'episode' or 'show'
        VideoId: spotifyData.id       // ID extracted from the link
    });

    await newPost.save();
    res.redirect('/admin/podcast'); // Redirect to podcast list
});

module.exports = router;
