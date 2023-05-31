const { User } = require('../models/user');
const { HttpError, ctrlWrapper } = require('../helpers');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fs = require('fs/promises');
const path = require('path');

const { SECRET_KEY } = process.env;
const avatarsDir = path.join(__dirname, '..', 'public', 'avatars');

const register = async (req, res) => {
  console.log(req.body);
  console.log(req.file);
  const { path: tempAvatarsDir, originalname } = req.file;
  const resultAvatarsDir = path.join(avatarsDir, originalname);

  await fs.rename(tempAvatarsDir, resultAvatarsDir);

  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw new HttpError(409, 'Email in use');
  }
  const avatarURL = path.join('avatars', originalname);
  const hashPassword = await bcrypt.hash(password, 10);
  const newUser = await User.create({ ...req.body, password: hashPassword, avatarURL });

  res.status(201).json({
    [newUser.name]: {
      email: newUser.email,
      subscription: newUser.subscription,
      avatarURL: newUser.avatarURL,
    },
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(401, 'Email or password is wrong');
  }
  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw HttpError(401, 'Email or password is wrong');
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

const getCurrent = async (req, res) => {
  const { email, subscription } = req.user;
  res.json({
    email,
    subscription,
  });
};

const logout = async (req, res, next) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: '' });

  res.status(204).json({
    message: 'Logout success',
  });
};

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
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
  getCurrent: ctrlWrapper(getCurrent),
  logout: ctrlWrapper(logout),
  updateUserSubscription: ctrlWrapper(updateUserSubscription),
};
