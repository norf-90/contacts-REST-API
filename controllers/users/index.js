const { register } = require('./register');
const { login } = require('./login');
const { getCurrent } = require('./getCurrent');
const { logout } = require('./logout');
const { updateUserSubscription } = require('./updateUserSubscription');
const { updateAvatar } = require('./updateAvatar');
const { verifyEmail } = require('./verifyEmail');
const { resendVerifyEmail } = require('./resendVerifyEmail.js');

module.exports = {
  register,
  verifyEmail,
  login,
  getCurrent,
  logout,
  updateUserSubscription,
  updateAvatar,
  resendVerifyEmail,
};
