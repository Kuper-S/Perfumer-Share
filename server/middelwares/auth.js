const jwt = require('jsonwebtoken');
const User = require('../models/user');

// Verify a JWT token and attach the user object to the request object
async function authenticate(req, res, next) {
  // Get the token from the request header
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  try {
    // Verify the token and extract the user ID
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.user.id;

    // Find the user in the database and attach it to the request object
    const user = await User.findById(userId);
    if (!user) {
      return res.status(401).json({ msg: 'Invalid token' });
    }

    req.user = user;
    next();
  } catch (err) {
    console.error(err.message);
    res.status(401).json({ msg: 'Invalid token' });
  }
}

module.exports = {
  authenticate,
};
