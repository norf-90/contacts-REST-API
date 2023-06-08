const { ctrlWrapper, HttpError, sendEmail } = require('../../helpers');
const { User } = require('../../models/user');
const { APP_HOST } = process.env;

const resendVerifyEmail = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(404, 'User not found');
  }
  if (user.verify) {
    throw HttpError(400, 'Verification has already been passed');
  }
  const verifyEmail = {
    to: email,
    subject: 'Activate Your Account',
    html: `<h3>We just need to validate your email address to activate your Mailjet account. Simply click the following link</h3> <a target="_blank" href= "${APP_HOST}/api/users/verify/${user.verificationToken}">Click here to verify email</a>`,
  };
  await sendEmail(verifyEmail);
  res.json({
    message: 'Verification email sent',
  });
};

module.exports = {
  resendVerifyEmail: ctrlWrapper(resendVerifyEmail),
};
