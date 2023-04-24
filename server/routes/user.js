const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const { body, validationResult } = require('express-validator');
const { createUser,
    getUser,
    updateUser,
    deleteUser } = require('../controllers/UserController');
const { authenticate } = require('../middlewares/auth');

// User Registration Route
router.post(
  '/register',
  // Add validation middleware to validate user input
  body('email').isEmail().normalizeEmail(),
  body('password').isLength({ min: 6 }),
  async (req, res) => {
    // Validate user input and return errors if any
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      // Create a new user in the database
      const user = await createUser(email, password);

      // Return a success message to the client
      res.json({ msg: 'User registered successfully' });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);
router.get('/profile', authenticate, async (req, res) => {
    try {
      // Retrieve the user's profile from the database
      const user = await getUser(req.user.id);
  
      res.json(user);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });
  
  // User Profile Update Route

router.put('/profile', authenticate, 
  // Add validation middleware to validate user input
  body('firstName').trim().notEmpty(),
  body('lastName').trim().notEmpty(),
  async (req, res) => {
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
  
      res.json(user);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
});


// User Profile Delete Route
router.delete('/profile', authenticate, async (req, res) => {
    try {
      // Delete the user's profile from the database
      await deleteUser(req.user.id);
  
      res.json({ msg: 'User deleted successfully' });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  
});

module.exports = router;