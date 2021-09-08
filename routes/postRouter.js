const router = require("express").Router();
const {
  getCreatePostController,
  postCreatePostController,
  editGetController,
  editPostController,
  deletGetPostController,
  postsGetController
} = require("../controllers/postController");
const { isAthencated } = require("../middlewares/authMiddleware");
const postValidator = require("../validators/postValidator");
const upload = require("../middlewares/uploads");

router.get("/create", isAthencated, getCreatePostController);
router.post(
  "/create",
  isAthencated,
  upload.single("thumbnail"),
  postValidator,
  postCreatePostController
);

router.get('/edit/:id',isAthencated,editGetController)
router.post('/edit/:id',isAthencated,upload.single("thumbnail"),postValidator,editPostController)

router.get('/allpost',isAthencated,postsGetController)
router.get('/:id',isAthencated,deletGetPostController)

module.exports = router;
