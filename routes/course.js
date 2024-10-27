const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

// Function to extract YouTube video ID from the URL
function extractYouTubeVideoId(url) {
    const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
}

// Render the course page
router.get('/course', async (req, res) => {
    const courses = await Post.find({ type: 'course' });
    courses.forEach(course => {
        course.VideoId = extractYouTubeVideoId(course.link);
    });
    res.render('course', { courses });
});

// Route for uploading a new course
router.post('/course/upload', async (req, res) => {
    const { title, content, link } = req.body;
    const newPost = new Post({ title, content, link, type: 'course' });
    await newPost.save();
    res.redirect('/admin/course'); // Redirect to course list
});

// Additional routes for editing and deleting can be added here

router.get('/course/:id', async (req, res) => {
    try {
        const course = await Post.findById(req.params.id); // Adjust based on your database setup
        res.render('podcast', {podcast:null,  course });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error loading podcast');
    }
});

module.exports = router;
