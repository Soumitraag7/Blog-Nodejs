const router = require('express').Router()

const {profilePicUpoloadController,deleteProfilePic} = require('../controllers/uploadController')
const upload = require('../middlewares/uploads');

const {isAthencated} = require('../middlewares/authMiddleware')




router.post('/profilePic',isAthencated,upload.single('profilePics'),profilePicUpoloadController);
router.delete('/profilePic',isAthencated,deleteProfilePic)



module.exports = router;