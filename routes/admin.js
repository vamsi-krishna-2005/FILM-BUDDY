// routes/admin.js
const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
<<<<<<< HEAD
const { isAdmin } = require('../middleware/auth');


// Admin Dashboard
router.get('/admin', isAdmin, async (req, res) => {
    try {
        const podcasts = await Post.find({ type: 'podcast' });
        const courses = await Post.find({ type: 'course' });

        res.render('admin', { podcasts, courses });
    } catch (error) {
        console.error("Error fetching posts:", error);
        res.status(500).send("Internal Server Error");
    }
});


router.post('/admin/podcast/delete/:id', async (req, res) => {
    try {
        await Post.findByIdAndDelete(req.params.id);
        res.redirect('/admin'); // Redirect back to the podcast list
    } catch (error) {
        console.error('Error deleting podcast:', error);
        res.status(500).send('Error deleting podcast');
    }
});

// Delete a course
router.post('/admin/course/delete/:id', async (req, res) => {
    try {
        await Post.findByIdAndDelete(req.params.id);
        res.redirect('/admin'); // Redirect back to the course list
    } catch (error) {
        console.error('Error deleting course:', error);
        res.status(500).send('Error deleting course');
    }
});


=======

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

>>>>>>> 5c64ad7d335ec1c6cbad6af605c00cc65055c806
module.exports = router;
