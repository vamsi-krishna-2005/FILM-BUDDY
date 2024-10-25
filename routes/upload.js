// routes/upload.js
const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

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

module.exports = router;
