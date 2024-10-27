<<<<<<< HEAD
=======
// routes/upload.js
>>>>>>> 5c64ad7d335ec1c6cbad6af605c00cc65055c806
const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

<<<<<<< HEAD
// Handle form submission for podcast and course videos
// Add the helper functions here
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


function extractYouTubeVideoId(url) {
    const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
}

// Route to handle the upload
router.post('/upload', async (req, res) => {
    try {
        const { title, content, link, type } = req.body;
        let videoInfo = null;

        if (link.includes('spotify.com')) {
            videoInfo = extractSpotifyId(link);
            if (!videoInfo) {
                return res.status(400).send("Invalid Spotify link. Please use a valid show or episode link.");
            }
        } else if (link.includes('youtube.com') || link.includes('youtu.be')) {
            const videoId = extractYouTubeVideoId(link);
            if (!videoId) {
                return res.status(400).send("Invalid YouTube link. Please use a valid video link.");
            }
            videoInfo = { id: videoId, type: 'youtube' };
        }

        const newPost = new Post({
            title,
            content,
            link,
            type,
            VideoId: videoInfo.id,
            videoType: videoInfo.type // Store if it's an 'episode', 'show', or 'youtube'
        });

        await newPost.save();
        res.redirect('/admin');
    } catch (error) {
        console.error("Error uploading post:", error);
        res.status(500).send("Failed to upload content.");
    }
});


router.get('/post/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).send('Post not found');
        }
        res.render('post', { post });
    } catch (error) {
        console.error("Error fetching post:", error);
        res.status(500).send("Failed to fetch post details.");
    }
});


=======
// Render the form for uploading
router.get('/upload', (req, res) => {
    res.render('upload'); // Render the form to upload (upload.ejs)
});

// Handle form submission for podcast and course videos
router.post('/upload', async (req, res) => {
    const { title, content, link, type } = req.body;

    const newPost = new Post({
        title,
        content,
        link,
        type  // either 'podcast' or 'course'
    });

    await newPost.save(); // Save to MongoDB
    res.redirect('/admin'); // Redirect to the admin dashboard or success page
});

>>>>>>> 5c64ad7d335ec1c6cbad6af605c00cc65055c806
module.exports = router;
