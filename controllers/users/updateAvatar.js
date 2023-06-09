const { User } = require('../../models/user');
const { ctrlWrapper, imgResizing, cloudinary } = require('../../helpers');

// update avatar for current user
const updateAvatar = async (req, res, next) => {
  const { _id } = req.user;
  const { path } = req.file;
  await imgResizing(req.file);
  const { url } = await cloudinary.uploader.upload(path, {
    folder: 'avatars',
  });

  const updatedUser = await User.findByIdAndUpdate(_id, { avatarURL: url }, { new: true });

  res.json(updatedUser.avatarURL);
};

module.exports = {
  updateAvatar: ctrlWrapper(updateAvatar),
};
