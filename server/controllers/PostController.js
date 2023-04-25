const Post = require('../db/models/PostModel');
const mongoose = require('mongoose');

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

    if (post.postedBy.toString() !== req.user.id) {
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

    if (post.postedBy.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    await post.remove();

    res.json({ msg: 'Post deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
}

module.exports = {
  getAllPosts,
  getPost,
  getPostById,
  createPost,
  updatePost,
  deletePost,
};
