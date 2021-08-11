const router = require('express').Router()

const {profilePicUpoloadController,deleteProfilePic} = require('../controllers/uploadController')
const upload = require('../middlewares/uploads');

const {isAthencated} = require('../middlewares/authMiddleware')




router.post('/profilePic',upload.single('profilePics'),profilePicUpoloadController);
router.delete('/profilePic',deleteProfilePic)



module.exports = router;