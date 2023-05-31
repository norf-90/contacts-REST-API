const express = require('express');
const ctrl = require('../../controllers');
const { validateBody, authenticate, isValidId, upload } = require('../../middlewares');
const { schemas } = require('../../models/user');

const router = express.Router();

// auth/signup
router.post(
  '/register',
  // validateBody(schemas.registerSchema),
  upload.single('avatarURL'),
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

module.exports = router;
