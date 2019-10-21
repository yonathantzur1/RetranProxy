const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const http = require('http').Server(app);
const config = require('./config');

app.enable('trust proxy');
app.use(bodyParser.json({ limit: config.server.reqDataSizeLimit }));
app.use(bodyParser.urlencoded({
    limit: config.server.reqDataSizeLimit,
    extended: true
}));

http.listen(8000, () => {
    console.log("Test server is up!");
});

app.get('/test', (req, res) => {
    console.log("get route");
    console.log("params: " + JSON.stringify(req.query));
    console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
    res.end();
});

app.post('/test', (req, res) => {
    console.log("post route");
    console.log("params: " + JSON.stringify(req.body));
    console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
    res.end();
});

app.put('/test', (req, res) => {
    console.log("put route");
    console.log("params: " + JSON.stringify(req.body));
    console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
    res.end();
});

app.delete('/test', (req, res) => {
    console.log("delete route");
    console.log("params: " + JSON.stringify(req.query));
    console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
    res.end();
});