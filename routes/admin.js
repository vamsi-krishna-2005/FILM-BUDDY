// routes/admin.js
const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
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


module.exports = router;
