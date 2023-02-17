const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 4000;

const routes = require('./routes');
require('dotenv/config');

const app = express();

app.use(bodyParser.json());

app.use('/api', routes);

/* Connect to DB */
mongoose
    .connect(process.env.DB_CONNECTION)
    .then(() => console.log('connected to DB!'))
    .catch((err) => console.log(err));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
