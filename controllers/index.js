const { getAll, getById, add, deleteById, updateById, updateStatusContact } = require('./contacts');

const { register, login, getCurrent, logout, updateUserSubscription } = require('./users');

module.exports = {
  getAll,
  getById,
  add,
  deleteById,
  updateById,
  updateStatusContact,

  register,
  login,
  getCurrent,
  logout,
  updateUserSubscription,
};
