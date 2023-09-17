require('dotenv').config();
const mongoose = require('mongoose');
const app = require('./app');

mongoose
    .connect(`${process.env.__MONGOSERVER}/task-manager`)
    .then(() => console.log('DB connected.'))
    .catch((err) => console.log(err));

const port = process.env.__PORT || 3000;
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
