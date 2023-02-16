const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

/* Get all the post */
router.get('/', async (req, res) => {
    try {
        const posts = await Post.find();
        res.json(posts);
    } catch (err) {
        res.json(err);
    }
});

/* Specific Post */
router.get('/:postId', async (req, res) => {
    try {
        const posts = await Post.findById(req.params.postId);
        res.json(posts);
    } catch (err) {
        res.json(err);
    }
});

/* Submit the Post */
router.post('/', async (req, res) => {
    const post = new Post({
        title: req.body.title,
        description: req.body.description,
    });

    const savedPost = await post.save();
    try {
        res.json(savedPost);
    } catch (err) {
        res.json({ message: err });
    }
});

/* Update the Post */
router.patch('/:postId', async (req, res) => {
    try {
        const updatePost = await Post.updateOne(
            {
                _id: req.params.postId,
            },
            {
                $set: {
                    title: req.body.title,
                },
            }
        );
        res.json(updatePost);
    } catch (err) {
        res.json({ message: err });
    }
});

/* Delete the Post */
router.delete('/:postId', async (req, res) => {
    try {
        const deletedPost = await Post.remove({
            _id: req.params.postId,
        });
        res.json(deletedPost);
    } catch (err) {
        res.json(err);
    }
});

module.exports = router;
