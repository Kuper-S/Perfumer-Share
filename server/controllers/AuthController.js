const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../db/models/UserModel');
const { body, validationResult } = require('express-validator');

const secret = process.env.JWT_SECRET;

// Create an array of middleware functions to validate the request body for registering a user
const registerValidation = [
  // Validate the email field
  body('email').isEmail().withMessage('Invalid email address'),

  // Validate the password field
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),

  // Validate the firstName field
  body('firstName').isLength({ min: 2 }).withMessage('First name is required'),

  // Validate the lastName field
  body('lastName').isLength({ min: 2 }).withMessage('Last name is required'),

  // Handle validation errors
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

// Handler for registering a new user
async function handleRegister(req, res, next) {
  try {
    const { email, password, firstName, lastName ,gender} = req.body;

    // Check if user with email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User with that email already exists' });
    }

    // Hash password
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const newUser = new User({
      email,
      password: hashedPassword,
      firstName,
      lastName,
      gender
    });

    // Save user to database
    await newUser.save();

    // Create JWT token
    const token = jwt.sign({ userId: newUser._id }, secret);

    // Return token to client
    res.json({ token });
  } catch (error) {
    next(error);
  }
}

// Handler for logging in a user
async function handleLogin(req, res, next) {
  try {
    const { email, password } = req.body;

    // Check if user with email exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Check if password is correct
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Create JWT token
    const token = jwt.sign({ userId: user._id }, secret);

    // Return token to client
    res.json({ token });
  } catch (error) {
    next(error);
  }
}

// Handler for logging out a user
async function handleLogout(req, res, next) {
  try {
    // No action needed, client will discard JWT token
    res.status(200).send();
  } catch (error) {
    next(error);
  }
}

module.exports = { handleRegister, handleLogin, handleLogout, registerValidation };
