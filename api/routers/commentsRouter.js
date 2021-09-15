const router = require('express').Router()

const {
    commetsPostController,
    replysCommetsPostController
} = require('../controllers/commentsController')
const {
    likesGetController,
    getDisLikesController
} = require('../controllers/likeDislikeController')
const {
    bookmarksGetController
} = require('../controllers/bookmarksController')

const { isAthencated} = require('../../middlewares/authMiddleware')

router.use(isAthencated)



router.post('/comments/:postID',commetsPostController)
router.post('/comments/replys/:commentID',replysCommetsPostController)

router.get('/likes/:postId',likesGetController)
router.get('/dislikes/:postId',getDisLikesController)

router.get('/bookmarks/:postId',bookmarksGetController)


module.exports = router