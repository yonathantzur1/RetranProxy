const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const http = require('http').Server(app);
const config = require('./config');

const proxy = require('./logic/proxy');

app.enable('trust proxy');
app.use(bodyParser.json({ limit: config.server.reqDataSizeLimit }));
app.use(bodyParser.urlencoded({
    limit: config.server.reqDataSizeLimit,
    extended: true
}));

http.listen(config.server.port, () => {
    console.log("Server is up!");
});

app.use('/', proxy);