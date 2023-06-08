const { User } = require('../../models/user');
const { HttpError, ctrlWrapper } = require('../../helpers');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { SECRET_KEY } = process.env;

// login
const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(401, 'Email  is wrong');
  }

  if (!user.verify) {
    throw HttpError(401, 'Email is not verified');
  }
  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw HttpError(401, 'Password is wrong');
  }

  const payload = {
    id: user._id,
  };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '23h' });
  const updatedUser = await User.findByIdAndUpdate(user._id, { token });
  res.json({
    token,
    [updatedUser.name]: {
      email: updatedUser.email,
      subscription: updatedUser.subscription,
    },
  });
};

module.exports = {
  login: ctrlWrapper(login),
};
