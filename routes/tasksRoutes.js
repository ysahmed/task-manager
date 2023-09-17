const Router = require('express').Router();
const controller = require('../controllers/tasksController');
const auth = require('../middlewares/auth');

Router.use(auth);
Router.route('/').post(controller.add).get(controller.getAll);

Router.route('/:id').patch(controller.update).delete(controller.delete);

module.exports = Router;
