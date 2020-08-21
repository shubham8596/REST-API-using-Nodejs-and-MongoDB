const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const config = require('./config.js');
const mongoose = require('mongoose');
require('./student.routes.js')(app);

//database connection
mongoose.connect('mongodb://localhost/restapi')
    .then(() => {console.log("Successfully connected to the database");})
    .catch(err => {console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});


app.get('/', (req, res) => {
    res.json({"message": "Please enter proper URL"});
});

// listen on port 3000
app.listen(config.serverport, () => {
    console.log("Server is listening on port 3000");
});
