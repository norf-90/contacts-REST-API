const { User } = require('../../models/user');
const { HttpError, ctrlWrapper, sendEmail, cloudinary, imgResizing } = require('../../helpers');
const bcrypt = require('bcrypt');
const gravatar = require('gravatar');
const { nanoid } = require('nanoid');

const { APP_HOST } = process.env;

// registration with default avatar generation
const register = async (req, res) => {
  let avatarURL = null;
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, 'Email in use');
  }

  if (req.file) {
    const { path } = req.file;
    await imgResizing(req.file);

    const fileData = await cloudinary.uploader.upload(path, {
      folder: 'avatars',
    });
    avatarURL = fileData.url;
  } else {
    avatarURL = gravatar.url(email);
  }

  const hashPassword = await bcrypt.hash(password, 10);
  const verificationToken = nanoid();
  const newUser = await User.create({
    ...req.body,
    password: hashPassword,
    avatarURL,
    verificationToken,
  });

  const verifyEmail = {
    to: email,
    subject: 'Activate Your Account',
    html: `<h3>We just need to validate your email address to activate your Mailjet account. Simply click the following link</h3> <a target="_blank" href= "${APP_HOST}/api/users/verify/${verificationToken}">Click here to verify email</a>`,
  };
  await sendEmail(verifyEmail);

  res.status(201).json({
    [newUser.name]: {
      email: newUser.email,
      subscription: newUser.subscription,
    },
  });
};

module.exports = {
  register: ctrlWrapper(register),
};
