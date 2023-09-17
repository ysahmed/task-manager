const mongoose = require('mongoose');
const crypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const schema = new mongoose.Schema({
    firstName: {
        type: String,
        set: capitalize,
        minlength: 1,
        maxlength: 255,
        required: true,
    },

    lastName: {
        type: String,
        set: capitalize,
        minlength: 1,
        maxlength: 255,
        required: true,
    },

    email: {
        address: {
            type: String,
            lowercase: true,
            trim: true,
            minlength: 5,
            maxlength: [255, 'Sorry, only 255 characters are allowed.'],
            required: [true, 'A valid email address is required.'],
            unique: [true, 'Email already registerd.'],
        },
        verified: {
            type: Boolean,
            default: false,
        },
    },

    phone: {
        type: String,
        match: /^\+\d+$/,
        minlength: 8,
        maxlength: 30,
        required: false,
    },
    password: {
        type: String,
        set: hash,
        minlength: 8,
        maxlength: 1024,
        required: true,
    },
});

function capitalize(val) {
    return val.charAt(0).toUpperCase() + val.substring(1).toLowerCase();
}

function hash(val) {
    return crypt.hashSync(val, 12);
}

schema.methods.getToken = function () {
    return jwt.sign(
        { name: this.firstName, _id: this._id },
        process.env.__TASK_JWTPRIVATEKEY
    );
};

const User = mongoose.model('User', schema);
module.exports = User;
