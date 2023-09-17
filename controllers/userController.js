/* eslint-disable consistent-return */
const Joi = require('joi');
const { omit } = require('lodash');
const cook = require('../utility/jsonCooker');
const User = require('../models/user');

const pattern = /^\+\d+$/;
const schema = Joi.object({
    firstName: Joi.string().min(1).max(255).required(),
    lastName: Joi.string().min(1).max(255).required(),
    email: Joi.string().min(5).max(255).required().email(),
    phone: Joi.string()
        .min(8)
        .max(30)
        .regex(pattern)
        .messages({ 'string.pattern.base': `Invalid phone number.` }),
    password: Joi.string().min(8).max(255).required(),
});

// validator
async function validate(body) {
    try {
        await schema.validateAsync(body);
    } catch (error) {
        return error;
    }
}

// add
exports.register = async (req, res) => {
    const error = await validate(req.body);
    if (error) return res.status(400).json(cook.fail(error.message));

    const user = await User.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: {
            address: req.body.email,
        },
        phone: req.body.phone,
        password: req.body.password,
    });

    res.status(201).json(cook.success(omit(user._doc, ['__v', 'password'])));
};

// get self
exports.getMe = async (req, res) => {
    const user = await User.findOne({ _id: req._user._id });
    if (!user) return res.status(400).json(cook.fail('User not found.'));

    res.status(200).json(cook.success(omit(user._doc, ['__v', 'password'])));
};
