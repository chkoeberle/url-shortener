const bodyParser = require('body-parser')
const express = require('express');
const app = express();

app.use(bodyParser.json({limit: '1mb'}));
require("./routes/api")(app);

const server = app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});

module.exports = server;