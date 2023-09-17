/* eslint-disable consistent-return */
/* eslint-disable no-restricted-syntax */
const Joi = require('joi');
const cook = require('../utility/jsonCooker');
const Task = require('../models/task');

function schema(title) {
    return Joi.object({
        title,
        description: Joi.string().max(32),
        dueDate: Joi.string().isoDate(),
        priority: Joi.number().min(0).max(2),
        status: Joi.string().max(8),
        remindBefore: Joi.number(),
        tags: Joi.array().items(Joi.string()),
    });
}

const postSchema = schema(Joi.string().min(3).max(32).required());

const updateSchema = schema(Joi.string().min(3).max(32));

async function validatePost(body) {
    try {
        await postSchema.validateAsync(body);
    } catch (error) {
        return error;
    }
}

async function validateUpdate(body) {
    try {
        await updateSchema.validateAsync(body);
    } catch (error) {
        return error;
    }
}
// post
exports.add = async (req, res) => {
    const error = await validatePost(req.body);
    if (error) return res.status(400).json(cook.fail(error.message));

    const task = new Task(req.body);
    task.userId = req._user._id;
    await task.save();
    res.status(200).json(cook.success(task));
};

// get
exports.getAll = async (req, res) => {
    // get user id from request
    // find all that matches the user id
    const tasks = await Task.find({
        _id: req.params.id,
        userId: req._user._id,
    });
    res.status(200).json(cook.successMany(tasks));
};

// update
exports.update = async (req, res) => {
    // TODO: update only body validator
    const error = await validateUpdate(req.body);
    if (error) return res.status(400).json(cook.fail(error.message));
    // get user id from request
    // find one by id and user id
    const task = await Task.findOne({
        _id: req.params.id,
        userId: req._user._id,
    });
    if (!task) return res.status(400).json(cook.fail('Task not found.'));
    // update
    // eslint-disable-next-line guard-for-in
    for (const key in req.body) {
        task[key] = req.body[key];
    }
    // save
    await task.save();
    // send
    res.status(200).json(cook.success(task));
};

// delete
exports.delete = async (req, res) => {
    // get user id from request
    // find one by id and user id and delete
    const task = await Task.findOneAndDelete({
        _id: req.params.id,
        userId: req._user._id,
    });
    // send
    res.status(200).json(cook.success(task));
};
