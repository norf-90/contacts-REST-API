const { User } = require('../../models/user');
const { ctrlWrapper } = require('../../helpers');

// logout current user
const logout = async (req, res, next) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: '' });

  return res.status(204).json({
    message: 'Logout success',
  });
};

module.exports = {
  logout: ctrlWrapper(logout),
};
