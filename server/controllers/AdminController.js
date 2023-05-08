const User = require('../db/models/UserModel');

async function grantAdmin(req, res, next) {
    try {
      const user = req.user;
  
      if (!user) {
        return res.status(404).json({ msg: 'User not found' });
      }
  
      user.isAdmin = true;
      await user.save();
  
      res.json({ msg: 'User is now an admin' });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
  

module.exports = {
  grantAdmin,
};
