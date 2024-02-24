const router = require('express').Router();
const authValidator = require('../validators/authSingnupValidation');
const authLoginValidator = require('../validators/authLoginvalidation');
const { isUnAthencated } = require('../middlewares/authMiddleware');
const {
	getSignUpController,
	postSignUpController,
	getLoginController,
	postLoginController,
	logoutController
} = require('../controllers/authController');

router.get('/signup', isUnAthencated, getSignUpController);
router.post('/signup', isUnAthencated, authValidator, postSignUpController);
router.get('/login', isUnAthencated, getLoginController);
router.post('/login', isUnAthencated, authLoginValidator, postLoginController);
router.get('/logout', isUnAthencated, logoutController);

module.exports = router;
