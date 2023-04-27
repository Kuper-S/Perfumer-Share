import jwt from 'jsonwebtoken'; 

const generateToken = (userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '7d' });
  return token;
};

const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded.userId;
  } catch (err) {
    console.error(err);
    return null;
  }
};

module.exports = {
  generateToken,
  verifyToken,
};
