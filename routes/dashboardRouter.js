const router = require("express").Router();

const {
  getDashboardController,
  getCreateProfileController,
  postCreateProfileController,
  getEditProfileController,
  postEditProfileController,
} = require("../controllers/dashboardController");
const { isAthencated } = require("../middlewares/authMiddleware");

  

router.get("/", isAthencated, getDashboardController);

router.get("/create-Profile",getCreateProfileController);
router.get("/create-Profile",postCreateProfileController);

router.get("/edit-Profile",getEditProfileController);
router.get("/edit-Profile",postEditProfileController);

module.exports = router;
