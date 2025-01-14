const { ctrlWrapper } = require('../../helpers');

// get current user
const getCurrent = async (req, res) => {
  const { email, subscription } = req.user;
  res.json({
    email,
    subscription,
  });
};

module.exports = {
  getCurrent: ctrlWrapper(getCurrent),
};
