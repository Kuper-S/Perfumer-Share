const Post = require('../db/models/PostModel');
const mongoose = require('mongoose');
const { validationResult } = require('express-validator');

// Get all posts
async function getAllPosts(req, res) {
  try {
    const posts = await Post.find().populate('postedBy', 'firstName lastName avatar');
    res.json(posts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
}

// Get a single post
async function getPost(req, res) {
  try {
    const post = await Post.findById(req.params.id).populate('postedBy', 'firstName lastName avatar');
    if (!post) {
      return res.status(404).json({ msg: 'Post not found' });
    }
    res.json(post);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
}

// Get a post by ID
async function getPostById(postId) {
  const isValidObjectId = mongoose.isValidObjectId(postId);

  if (!isValidObjectId) {
    return null;
  }

  const post = await Post.findById(postId).populate('postedBy', 'firstName lastName avatar');

  return post;
}

// Create a new post
async function createPost(req, res) {
  try {
    const { title, body, image, perfumeName } = req.body;

    const post = new Post({
      title,
      body,
      image,
      perfumeName,
      postedBy: req.user.id,
    });

    // Check if user is admin
    if (!req.user.isAdmin) {
      return res.status(401).json({ msg: 'Unauthorized user' });
    }

    await post.save();
    console.log(`Post created by ${req.user.firstName}: ${post}`);
    res.json(post);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
}

// Update a post
async function updatePost(req, res) {
  try {
    const { title, body, image, perfumeName } = req.body;

    let post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ msg: 'Post not found' });
    }

    // Check if user is admin or the owner of the post
    if (post.postedBy.toString() !== req.user.id && !req.user.isAdmin) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    post.title = title;
    post.body = body;
    post.image = image;
    post.perfumeName = perfumeName;

    await post.save();

    res.json(post);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
}


// Delete a post
async function deletePost(req, res) {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ msg: 'Post not found' });
    }

    // Check if user is admin or the owner of the post
    if (post.postedBy.toString() !== req.user.id && !req.user.isAdmin) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    await post.remove();

    res.json({ msg: 'Post deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
}

const likePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    // Check if post has already been liked by this user
    if (post.likes.some(like => like.user.toString() === req.user.id)) {
      return res.status(400).json({ msg: 'Post already liked' });
    }

    post.likes.unshift({ user: req.user.id });

    await post.save();

    res.json(post.likes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Add a comment to a post
const addComment = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { id } = req.params;
    const { text, userId } = req.body;
    const post = await Post.findById(id);

    if (!post) {
      return res.status(404).json({ msg: 'Post not found' });
    }

    const newComment = {
      text,
      user: userId,
    };

    post.comments.unshift(newComment);
    await post.save();

    res.json(post);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Delete a comment from a post
const deleteComment = async (req, res) => {
  try {
    const { id, commentId } = req.params;
    const post = await Post.findById(id);

    if (!post) {
      return res.status(404).json({ msg: 'Post not found' });
    }

    const comment = post.comments.find((comment) => comment.id === commentId);

    if (!comment) {
      return res.status(404).json({ msg: 'Comment not found' });
    }

    if (comment.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    post.comments = post.comments.filter((comment) => comment.id !== commentId);
    await post.save();

    res.json(post);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};


module.exports = {
  getAllPosts,
  getPost,
  getPostById,
  createPost,
  updatePost,
  deletePost,
  likePost,
  deleteComment,
  addComment,

};
