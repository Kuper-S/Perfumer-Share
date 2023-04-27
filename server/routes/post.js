const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const { authenticate } = require('../middlewares/auth');
const { getAllPosts, createPost, getPost, updatePost, deletePost ,likePost,
  deleteComment,
  addComment,} = require('../controllers/PostController');

// Get all posts
router.get('/', getAllPosts);

// Get a specific post by ID
router.get('/:id', getPost);

// Create a new post
router.post('/', authenticate,
  body('title').trim().notEmpty(),
  body('body').trim().notEmpty(),
  body('image').trim().notEmpty(),
  body('perfumeName').trim().notEmpty(),
  createPost
);

// Update a specific post by ID
router.put('/:id', authenticate,
  body('title').trim().notEmpty(),
  body('body').trim().notEmpty(),
  body('perfumeName').trim().notEmpty(),
  updatePost
);

// Delete a specific post by ID
router.delete('/:id', authenticate, deletePost);

// Like a specific post by ID
router.post('/:id/like', authenticate, likePost);

// Add a comment to a post
router.post('/:id/comments', authenticate,
  body('text').trim().notEmpty(),
  addComment
);

// Delete a comment from a post
router.delete('/:id/comments/:commentId', authenticate, deleteComment);

module.exports = router;
