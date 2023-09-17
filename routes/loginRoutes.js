const router = require('express').Router();
const controller = require('../controllers/loginController');

router.route('/').post(controller.login);

module.exports = router;
