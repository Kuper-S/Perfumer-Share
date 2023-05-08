const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const path = require('path');
const dotenv = require('dotenv');
dotenv.config({
  path: path.resolve(__dirname, '../.env')
});

// Import the user routes
const userRoutes = require('./routes/user');
const postRoutes = require('./routes/post');
const authRoutes = require('./routes/auth');
const app = express();
const mongoose = require('mongoose');
const URI = process.env.MONGODB_URI;
const PORT = process.env.PORT

// Define admin middleware
const isAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    // If the user is admin, call the next middleware
    next();
  } else {
    // If the user is not admin, send a 403 forbidden error
    res.status(403).json({ message: 'Admin access required' });
  }
};

// Enable CORS
app.use(cors());
app.use(cookieParser());
app.get('/set-cookie', (req, res) => {
  res.cookie('myCookie', 'cookieValue', { 
    sameSite: 'none', 
    secure: true,
    httpOnly: true // recommended for security reasons
  });
  res.send('Cookie set!');
});
// Parse JSON request bodies
app.use(bodyParser.json());

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'client/build')));

// Set up the user routes
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/auth', authRoutes);

// Admin routes
app.get('/api/admin-only', isAdmin, (req, res) => {
  res.json({ message: 'This is an admin-only route' });
});



// Connect to the MongoDB database
mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB database');
    
    app.listen(PORT, () => {
      console.log(`App is listening on port ${PORT}! , http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB database:', error.message);
    

    process.exit(1);
  });