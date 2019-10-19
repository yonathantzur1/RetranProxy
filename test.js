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
    let x = 1;
    res.end();
});

app.post('/testPost', (req, res) => {
    let x = 1;
    res.end();
});

app.put('/testPut', (req, res) => {
    let x = 1;
    res.end();
});

app.delete('/testDelete', (req, res) => {
    let x = 1;
    res.end();
});