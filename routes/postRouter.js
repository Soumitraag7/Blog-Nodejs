const router = require('express').Router()
const {getCreatePostController,postCreatePostController} = require('../controllers/postController')


router.get('/create',getCreatePostController)
router.post('/create',postCreatePostController)


module.exports = router