const http = require('http');
const HTTP_ERROR = require('../enums').HTTP_ERROR;
const retran = require('./retran');

module.exports = (sendObj) => {
    const req = http.request(sendObj.options, (res) => {
        if (res.statusCode != HTTP_ERROR.OK &&
            res.statusCode != HTTP_ERROR.NOT_FOUND) {
            retran.insert(sendObj);
        }
    });

    req.on('timeout', () => {
        req.abort();
    });

    req.on('error', () => {
        retran.insert(sendObj);
    });

    // Write data to request body.
    sendObj.data && req.write(sendObj.data);

    req.end();
}