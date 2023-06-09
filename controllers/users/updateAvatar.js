const { User } = require('../../models/user');
const { ctrlWrapper } = require('../../helpers');

const fs = require('fs/promises');
const path = require('path');
const jimp = require('jimp');

const avatarsDir = path.join(__dirname, '..', '..', 'public', 'avatars');

// update avatar for current user
const updateAvatar = async (req, res, next) => {
  const { _id } = req.user;
  const { path: tempAvatarsDir, filename } = req.file;
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
  updateAvatar: ctrlWrapper(updateAvatar),
};
