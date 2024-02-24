const router = require('express').Router();

const {
	profilePicUpoloadController,
	deleteProfilePic,
	postImageUploadController
} = require('../controllers/uploadController');
const upload = require('../middlewares/uploads');

const { isAthencated } = require('../middlewares/authMiddleware');

router.post(
	'/profilePic',
	isAthencated,
	upload.single('profilePics'),
	profilePicUpoloadController
);
router.delete('/profilePic', isAthencated, deleteProfilePic);
router.post(
	'/postimage',
	isAthencated,
	upload.single('post-image'),
	postImageUploadController
);

module.exports = router;
