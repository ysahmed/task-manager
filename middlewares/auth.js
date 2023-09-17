const jwt = require('jsonwebtoken');
const { fail } = require('../utility/jsonCooker');

module.exports = (req, res, next) => {
    const authHeader = req.header('Authorization');
    const token = authHeader && authHeader.split(' ')[1];
    jwt.verify(token, process.env.__TASK_JWTPRIVATEKEY, (err, user) => {
        if (err) {
            return res.status(403).json(fail('Access denied. Invalid token'));
        }

        req._user = user;
        next();
    });
};
