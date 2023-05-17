const User = require('../db/models/UserModel');
const bcrypt = require('bcryptjs');

// Create a new user in the database
async function createUser(email, password, firstName, lastName, gender) {
  // Check if user already exists in the database
  let user = await User.findOne({ email });
  if (user) {
    throw new Error('User already exists');
  }

  // Hash the password and create a new user in the database
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  user = new User({ email, password: hashedPassword, firstName, lastName, gender });
  await user.save();
  console.log(`New user registered: ${firstName} ${lastName} ,email: (${email})`);
  return user;
}

// Retrieve an existing user from the database
async function getUser(id) {
  try {
    const user = await User.findById(id);
    if (!user) {
      throw new Error('User not found');
    }
    // console.log('User From userController:' , user);
    return user;
  } catch (error) {
    // Handle any errors that occur during user retrieval
    throw error;
  }
}

// Update an existing user in the database
async function updateUser(id, data, isAdmin = false) {
  const user = await getUser(id);

  // Only allow admins to update users other than themselves
  if (!isAdmin && user.id !== id) {
    throw new Error('You do not have permission to update this user');
  }

  Object.assign(user, data);
  await user.save();
}

// Delete an existing user from the database
async function deleteUser(id, isAdmin = false) {
  const user = await getUser(id);

  // Only allow admins to delete users other than themselves
  if (!isAdmin && user.id !== id) {
    throw new Error('You do not have permission to delete this user');
  }

  await User.findByIdAndDelete(id);
}

async function getUserByEmail(email) {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error('User not found');
  }
  return user;
}

module.exports = {
  createUser,
  getUser,
  updateUser,
  deleteUser,
  getUserByEmail,
};
