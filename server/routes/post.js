const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const { authenticate } = require('../middlewares/auth');
const { createPost, getPosts, getPost, updatePost, deletePost } = require('../controllers/PostController');

// Create a new post
router.post('/posts', authenticate, 
  body('title').trim().notEmpty(),
  body('body').trim().notEmpty(),
  body('perfume').trim().notEmpty(),
  body('perfumeName').trim().notEmpty(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const post = await createPost(req.body, req.user.id);
      res.json(post);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// Get all posts
router.get('/posts', async (req, res) => {
  try {
    const posts = await getPosts();
    res.json(posts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Get a specific post by ID
router.get('/posts/:id', async (req, res) => {
  try {
    const post = await getPost(req.params.id);
    if (!post) {
      return res.status(404).json({ msg: 'Post not found' });
    }
    res.json(post);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Update a specific post by ID
router.put('/posts/:id', authenticate, async (req, res) => {
  try {
    const post = await updatePost(req.params.id, req.body, req.user.id);
    if (!post) {
      return res.status(404).json({ msg: 'Post not found' });
    }
    res.json(post);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Delete a specific post by ID
router.delete('/posts/:id', authenticate, async (req, res) => {
  try {
    const post = await deletePost(req.params.id, req.user.id);
    if (!post) {
      return res.status(404).json({ msg: 'Post not found' });
    }
    res.json({ msg: 'Post deleted successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
