const { User } = require('../../models/user');
const { HttpError, ctrlWrapper } = require('../../helpers');

// update subscription field for user
const updateUserSubscription = async (req, res, next) => {
  const { userId } = req.params;
  const { _id } = req.user;

  const user = await User.findById(userId);
  if (!_id.equals(user._id)) {
    throw HttpError(401, "Not authorized. You can't change this user.");
  }

  const result = await User.findByIdAndUpdate(userId, req.body, { new: true });
  if (!result) {
    throw HttpError(404, 'Not found');
  }
  res.json(result);
};

module.exports = {
  updateUserSubscription: ctrlWrapper(updateUserSubscription),
};
