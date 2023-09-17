const router = require('express').Router();
const controller = require('../controllers/userController');
const auth = require('../middlewares/auth');

router.route('/').post(controller.register).get(auth, controller.getMe);

module.exports = router;
