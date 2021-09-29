const router = require('express').Router();
const { explorerGetController} = require('../controllers/explorersController')


router.get('/',explorerGetController)


module.exports = router;