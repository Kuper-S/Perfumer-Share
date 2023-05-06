const express = require('express');
const cors = require('cors');
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

// Enable CORS
app.use(cors());

// Parse JSON request bodies
app.use(bodyParser.json());

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'client/build')));

// Set up the user routes
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/auth', authRoutes);

// Connect to the MongoDB database
mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB database');
    const PORT = 3030;
    app.listen(PORT, () => {
      console.log(`App is listening on port ${PORT}! , http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB database:', error.message);
    

    process.exit(1);
  });