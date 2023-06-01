const { User } = require('../models/user');
const { HttpError, ctrlWrapper } = require('../helpers');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fs = require('fs/promises');
const path = require('path');
const gravatar = require('gravatar');
const jimp = require('jimp');

const { SECRET_KEY } = process.env;
const avatarsDir = path.join(__dirname, '..', 'public', 'avatars');

// registration with default avatar generation
const register = async (req, res) => {
  let avatarURL = null;
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (user) {
    throw new HttpError(409, 'Email in use');
  }

  if (req.file) {
    const { path: tempAvatarsDir, filename } = req.file;
    const resultAvatarsDir = path.join(avatarsDir, filename);
    await fs.rename(tempAvatarsDir, resultAvatarsDir);
    avatarURL = path.join('avatars', filename);

    const avatarAbsoluteURL = path.join(avatarsDir, filename);

    const avatar = await jimp.read(avatarAbsoluteURL);
    avatar.resize(250, 250);
    avatar.writeAsync(avatarAbsoluteURL);
  } else {
    avatarURL = gravatar.url(email);
  }

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

// login
const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(401, 'Email  is wrong');
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

// get current user
const getCurrent = async (req, res) => {
  const { email, subscription } = req.user;
  res.json({
    email,
    subscription,
  });
};

// logout current user
const logout = async (req, res, next) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: '' });

  res.status(204).json({
    message: 'Logout success',
  });
};

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

// update avatar for current user
const updateAvatar = async (req, res, next) => {
  const { _id } = req.user;
  const { path: tempAvatarsDir, filename } = req.file;
  console.log(`filename: ${filename}`);
  const resultAvatarsDir = path.join(avatarsDir, filename);

  await fs.rename(tempAvatarsDir, resultAvatarsDir);
  const avatarURL = path.join('avatars', filename);

  const avatarAbsoluteURL = path.join(avatarsDir, filename);
  const avatar = await jimp.read(avatarAbsoluteURL);
  avatar.resize(250, 250);
  avatar.writeAsync(avatarAbsoluteURL);

  const updatedUser = await User.findByIdAndUpdate(_id, { avatarURL }, { new: true });

  res.json(updatedUser.avatarURL);
};

module.exports = {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
  getCurrent: ctrlWrapper(getCurrent),
  logout: ctrlWrapper(logout),
  updateUserSubscription: ctrlWrapper(updateUserSubscription),
  updateAvatar: ctrlWrapper(updateAvatar),
};