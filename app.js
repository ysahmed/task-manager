const express = require('express');
const loginRouter = require('./routes/loginRoutes');
const userRouter = require('./routes/userRoutes');
const tasksRouter = require('./routes/tasksRoutes');
const { fail } = require('./utility/jsonCooker');

const app = express();

app.use(express.json());
app.use((err, req, res, next) => {
    if (err) return res.status(err.statusCode).send(fail(err.message));
    next();
});

app.use('/api/v1/users', userRouter);
app.use('/api/v1/login', loginRouter);
app.use('/api/v1/tasks', tasksRouter);

module.exports = app;
