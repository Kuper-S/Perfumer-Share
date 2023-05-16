const express = require('express');
const router = express.Router();
const path = require('path');
const User = require('../db/models/UserModel');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const { createUser,
    getUser,
    updateUser,
    deleteUser } = require('../controllers/UserController');
const { authenticate,isAdmin } = require('../middlewares/auth');
const dotenv = require('dotenv');
dotenv.config({
  path: path.resolve(__dirname, '../../.env')
});
const jwt_secret = process.env.JWT_SECRET;
// Error handling middleware
const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Server error' });
};

router.get('/', authenticate, isAdmin, async (req, res, next) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    next(err);
  }
});

// User Registration Route
router.post(
    '/register',
    // Add validation middleware to validate user input
    body('email').isEmail().normalizeEmail(),
    body('password').isLength({ min: 6 }),
    body('firstName').trim().notEmpty(),
    body('lastName').trim().notEmpty(),
  
    async (req, res, next) => {
      // Validate user input and return errors if any
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
  
      const { email, password, firstName, lastName, gender } = req.body;
  
      try {
        // Create a new user in the database
        const user = await createUser(email, password, firstName, lastName, gender);
        
        // Create a JWT token for the user
        const token = jwt.sign({ user: { id: user.id } }, jwt_secret, { expiresIn: '5h' });
  
        // Return a success message and token to the client
        res.json({ msg: 'User registered successfully', token });
      } catch (err) {
        next(err);
      }
    }
  );
  
router.get('/profile', authenticate, async (req, res, next) => {
    try {
      // Retrieve the user's profile from the database
      const user = await getUser(req.user.id);
  
      // Extract the desired fields from the user object
      const { firstName, lastName, avatar,email } = user;
  
      res.json({ firstName, lastName, email , avatar });
    } catch (err) {
      next(err);
    }
});
  
// User Profile Update Route
router.put('/profile', authenticate, 
  // Add validation middleware to validate user input
  body('firstName').trim().notEmpty(),
  body('lastName').trim().notEmpty(),
  async (req, res, next) => {
    const { firstName, lastName, avatar } = req.body;
  
    // Validate user input and return errors if any
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      // Update the user's profile in the database
      await updateUser(req.user.id, { firstName, lastName, avatar });
  
      // Retrieve the updated user's profile from the database
      const user = await getUser(req.user.id);
      console.log(`User Updated : ${user}`);
      res.json(user);
    } catch (err) {
      next(err);
    }
});

// User Profile Delete Route
router.delete('/profile', authenticate, async (req, res, next) => {
  try {
    const user = await getUser(req.user.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if the user is an admin
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'You do not have permission to delete this user' });
    }

    // Delete the user's profile from the database
    await deleteUser(req.user.id);

    res.json({ msg: 'User deleted successfully' });
    console.log(`User Deleted : ${user}`);
  } catch (err) {
    next(err);
  }
});

router.put('/grant-admin/:userId', authenticate, isAdmin, async (req, res, next) => {
  try {
    const user = await getUser(req.params.userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.isAdmin = true;
    await user.save();

    res.json({ message: 'Admin privileges granted successfully' });
  } catch (err) {
    next(err);
  }
});



// Attach error handling middleware to the router
router.use(errorHandler);

module.exports = router;
