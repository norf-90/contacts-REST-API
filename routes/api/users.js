const express = require('express');
const ctrl = require('../../controllers');
const { validateBody, authenticate, isValidId, upload } = require('../../middlewares');
const { schemas } = require('../../models/user');

const router = express.Router();

// auth/signup
router.post(
  '/register',
  upload.single('avatar'),
  validateBody(schemas.registerSchema),
  ctrl.register
);

// login/sigin
router.post('/login', validateBody(schemas.loginSchema), ctrl.login);

// current
router.get('/current', authenticate, ctrl.getCurrent);

// logout
router.post('/logout', authenticate, ctrl.logout);

// update subscription
router.patch(
  '/:userId/subscription',
  isValidId,
  authenticate,
  validateBody(schemas.updateSubscriptionSchema),
  ctrl.updateUserSubscription
);

// update avatar for current user
router.patch('/avatars', authenticate, upload.single('avatar'), ctrl.updateAvatar);

module.exports = router;
