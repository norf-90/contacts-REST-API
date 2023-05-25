const express = require('express');
const ctrl = require('../../controllers/auth');
const { validateBody } = require('../../middlewares');
const { schemas } = require('../../models/user');

const router = express.Router();

// auth/signup
router.post('/register', validateBody(schemas.registerSchema), ctrl.register);

// login/sigin
router.post('/login', validateBody(schemas.loginSchema), ctrl.login);

module.exports = router;
