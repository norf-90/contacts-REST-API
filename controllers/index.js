const { getAll, getById, add, deleteById, updateById, updateStatusContact } = require('./contacts');

const {
  register,
  verifyEmail,
  login,
  getCurrent,
  logout,
  updateUserSubscription,
  updateAvatar,
  resendVerifyEmail,
} = require('./users');

module.exports = {
  getAll,
  getById,
  add,
  deleteById,
  updateById,
  updateStatusContact,

  register,
  verifyEmail,
  resendVerifyEmail,
  login,
  getCurrent,
  logout,
  updateUserSubscription,
  updateAvatar,
};
