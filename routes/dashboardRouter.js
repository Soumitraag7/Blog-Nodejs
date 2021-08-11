const router = require("express").Router();

const {
  getDashboardController,
  getCreateProfileController,
  postCreateProfileController,
  getEditProfileController,
  postEditProfileController,
} = require("../controllers/dashboardController");
const { isAthencated } = require("../middlewares/authMiddleware");
const profileCreteValidator = require('../validators/profileCreateValidator')

  

router.get("/", isAthencated, getDashboardController);

router.get("/create-Profile",isAthencated,getCreateProfileController);
router.post("/create-Profile",isAthencated,profileCreteValidator,postCreateProfileController);

router.get("/edit-Profile",isAthencated,getEditProfileController);
router.get("/edit-Profile",isAthencated,postEditProfileController);

module.exports = router;
