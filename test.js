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

app.get('/testGet', (req, res) => {
    console.log("testGet");
    res.end();
});

app.post('/testPost', (req, res) => {
    console.log("testPost");
    res.end();
});

app.put('/testPut', (req, res) => {
    console.log("testPut");
    res.end();
});

app.delete('/testDelete', (req, res) => {
    console.log("testDelete");
    res.end();
});