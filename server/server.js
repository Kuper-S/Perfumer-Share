const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const path = require('path');

const dotenv = require('dotenv');
dotenv.config({
  path: path.resolve(__dirname, '../.env')
});
const userRoutes = require('./routes/user');

const app = express();
const mongoose = require('mongoose');
const URI = process.env.MONGODB_URI;

// Enable CORS
app.use(cors());

// Parse JSON request bodies
app.use(bodyParser.json());

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Set up the user routes
app.use('/api/users', userRoutes);

// Connect to the MongoDB database
// const db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', function() {
//   console.log('Connected to MongoDB');
// });
mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB database');
    const PORT = 3000;
    app.listen(PORT, () => {
      console.log(`App is listening on port ${PORT}!`);
    });
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB database:', error.message);
    

    process.exit(1);
  });