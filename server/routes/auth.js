const express = require('express');
const router = express.Router();

const { handleRegister,handleLogin ,handleLogout} = require('../controllers/AuthController');
const {authenticate} = require('../middlewares/auth');
const { body, validationResult } = require('express-validator');
const path = require('path');
const dotenv = require('dotenv');
dotenv.config({
  path: path.resolve(__dirname, '../../.env')
});


router.post('/login', 
  body('email').isEmail().normalizeEmail(),
  body('password').notEmpty(),
  handleLogin // Call the handleLogin function from the controller
);


router.post('/logout', authenticate, handleLogout);

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
