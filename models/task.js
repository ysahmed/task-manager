const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: [32, 'Title must not exceed 32 characters.'],
    },
    description: {
        type: String,
        default: null,
        minlength: 3,
        maxlength: 1024,
        required: false,
    },
    dateAdded: {
        type: Date,
        default: () => Date.now(),
        immutable: true,
    },
    dueDate: {
        type: Date,
        default: null,
        required: false,
    },
    priority: {
        type: Number,
        enum: [0, 1, 2],
        default: 0,
    },
    status: {
        type: String,
        enum: ['pending', 'complete'],
        default: 'pending',
    },
    remindBefore: {
        type: Number,
        default: null,
        required: false,
    },
    tags: {
        type: [String],
        maxlength: 10,
        required: false,
    },
});

const Task = mongoose.model('Task', schema);

module.exports = Task;
