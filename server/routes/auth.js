const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
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
      const token = jwt.sign({ user: { id: user.id } }, jwt_secret, { expiresIn: '1h' });

      res.json({ token });
    } catch (err) {
      next(err);
    }
  });

router.post('/logout', authenticate, async (req, res, next) => {
  try {
    // Invalidate the JWT token
    res.clearCookie('token');
    res.json({ msg: 'Logged out successfully' });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
