const express = require('express');
const loginRouter = require('./routes/loginRoutes');
const userRouter = require('./routes/userRoutes');
const app = express();

app.use(express.json());

app.use('/api/v1/users', userRouter);
app.use('/api/v1/login', loginRouter);

module.exports = app;
