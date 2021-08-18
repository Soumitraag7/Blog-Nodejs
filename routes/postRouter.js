const router = require('express').Router()
const {getCreatePostController,postCreatePostController} = require('../controllers/postController')
const {isAthencated} = require('../middlewares/authMiddleware')
const postValidator   = require('../validators/postValidator')


router.get('/create',isAthencated,getCreatePostController)
router.post('/create',isAthencated,postValidator,postCreatePostController)


module.exports = router