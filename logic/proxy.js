const sender = require('./sender');

const enums = require('../enums');
const config = require('../config');

module.exports = (req, res) => {
    res.end();

    let path = req.originalUrl;
    let method = req.method;
    let data;

    if (method == enums.REST.POST || method == enums.REST.PUT) {
        data = JSON.stringify(req.body);
    }

    let options = {
        hostname: config.target.address,
        port: config.target.port,
        path,
        method,
        timeout: config.target.timeout
    };

    if (data) {
        options.headers = {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': Buffer.byteLength(data)
        };
    }

    sender.sendReq(options, data);
}