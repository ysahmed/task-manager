const crypt = require('bcrypt');
const { pick } = require('lodash');
const Joi = require('joi');
const User = require('../models/user');
const cook = require('../utility/jsonCooker');

const bodySchema = Joi.object({
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(8).max(255).required(),
});

async function validate(body) {
    try {
        await bodySchema.validate(body);
    } catch (error) {
        return error;
    }
}

exports.login = async (req, res) => {
    const error = await validate(req.body);
    if (error) return res.status(400).json(cook.fail(error.message));

    const user = await User.findOne({ 'email.address': req.body.email });
    if (!user)
        return res.status(400).json(cook.fail('Invalid email or password'));

    const validPassword = await crypt.compare(req.body.password, user.password);
    if (!validPassword)
        return res.status(400).json(cook.fail('Invalid email or password'));

    // generate token
    const token = user.getToken();
    res.setHeader('Authorization', `Bearer ${token}`);
    res.status(200).json(cook.success(pick(user, ['firstName', 'lastName'])));
};
