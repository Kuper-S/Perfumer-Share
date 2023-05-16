const jwt = require('jsonwebtoken');
const User = require('../db/models/UserModel');
const path = require('path');
const dotenv = require('dotenv');
dotenv.config({
  path: path.resolve(__dirname, '../../.env')
});
const jwt_secret = process.env.JWT_SECRET;

// Verify a JWT token and attach the user object to the request object
async function authenticate(req, res, next) {
  
  // Get the token from the request header or cookie
  const token = req.header('Authorization')?.split(' ')[1] || req.cookies.token;
  console.log(`Consloe the jwt secret key from the middelware: ${jwt_secret}`)
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  try {
    // Verify the token and extract the user ID
    const decoded = jwt.verify(token, jwt_secret);
    const userId = decoded.userId;
    console.log('decoded:', decoded);
    // Find the user in the database and attach it to the request object
    const user = await User.findById(userId);
    console.log('User:', user,userId);
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

// Verify if the user is an admin
function isAdmin(req, res, next) {
  if (req.user && req.user.isAdmin) {
    return next();
  } else {
    return res.status(401).json({ msg: 'Unauthorized user' });
  }
}

module.exports = {
  authenticate,isAdmin
};
