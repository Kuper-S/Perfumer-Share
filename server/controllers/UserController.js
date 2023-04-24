const User = require('../models/user');

// Create a new user in the database
async function createUser(email, password) {
  // Check if user already exists in the database
  let user = await User.findOne({ email });
  if (user) {
    throw new Error('User already exists');
  }

  // Hash the password and create a new user in the database
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  user = new User({ email, password: hashedPassword });
  await user.save();

  return user;
}

// Retrieve an existing user from the database
async function getUser(id) {
  const user = await User.findById(id);
  if (!user) {
    throw new Error('User not found');
  }

  return user;
}

// Update an existing user in the database
async function updateUser(id, data) {
  const user = await getUser(id);
  Object.assign(user, data);
  await user.save();
}

// Delete an existing user from the database
async function deleteUser(id) {
  await User.findByIdAndDelete(id);
}

module.exports = {
  createUser,
  getUser,
  updateUser,
  deleteUser,
};
