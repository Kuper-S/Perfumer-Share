const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../db/models/UserModel')
const { handleRegister } = require('../controllers/AuthController');
const { body, validationResult } = require('express-validator');
const { getUserByEmail } = require('../controllers/UserController');
const { authenticate } = require('../middlewares/auth');
const path = require('path');
const dotenv = require('dotenv');
dotenv.config({
  path: path.resolve(__dirname, '../../.env')
});
const jwt_secret = process.env.JWT_SECRET;

router.post('/login', 
  body('email').isEmail().normalizeEmail(),
  body('password').notEmpty(),
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      // Check if the user exists in the database
      const user = await getUserByEmail(email);
      if (!user) {
        return res.status(401).json({ errors: [{ msg: 'Invalid credentials' }] });
      }

      // Compare the password with the hash stored in the database
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ errors: [{ msg: 'Invalid credentials' }] });
      }

      // Create a JWT token for the user
      const token = jwt.sign({ user: { id: user.id } }, jwt_secret, { expiresIn: '5h' });

      res.json({ token });
    } catch (err) {
      next(err);
    }
  });

  router.post('/logout', async (req, res, next) => {
  try {
    console.log(req.headers);
    // Get the JWT token from the request header
    const token = req.headers.authorization.split(' ')[1];
    
    // Decode the JWT token to get the user ID
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.user.id;
    
    // Remove the user's refresh token from the database
    await User.findByIdAndUpdate(userId, { refreshToken: null });

    // Invalidate the JWT token
    res.clearCookie('token');
    res.json({ msg: 'Logged out successfully' });
  } catch (err) {
    next(err);
  }
});


router.post('/register', 
  // Validate the request body
  body('email').isEmail().withMessage('Invalid email address'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  body('firstName').isLength({ min: 2 }).withMessage('First name is required'),
  body('lastName').isLength({ min: 2 }).withMessage('Last name is required'),

  // Handle validation errors
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },

  // Handle registration logic
  handleRegister
);

module.exports = router;
