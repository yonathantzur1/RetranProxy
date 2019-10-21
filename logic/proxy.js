const enums = require('../enums');
const config = require('../config');
const sender = require('./sender');

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
        timeout: config.target.timeout * 1000
    };

    if (data) {
        options.headers = {
            'Content-Type': 'application/json',
        };
    }

    let sendObj = { options, data };

    sender(sendObj);
}