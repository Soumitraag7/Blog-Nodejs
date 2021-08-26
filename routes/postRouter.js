const router = require("express").Router();
const {
  getCreatePostController,
  postCreatePostController,
  editPostController,
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

router.get('/edit/:id',isAthencated,editPostController)
// router.post('/edit',isAthencated,editePostController)

module.exports = router;
