const http = require('http');
const enums = require('../enums');
const retran = require('./retran');
const uuid = require('uuid/v1');

module.exports = (sendObj) => {
    (!sendObj.uuid) && (sendObj.uuid = uuid());

    const req = http.request(sendObj.options, (res) => {
        switch (res.statusCode) {
            case enums.HTTP_ERROR.OK:
                retran.end(sendObj);
                break;
            case enums.HTTP_ERROR.NOT_FOUND:
                // In case the route was not found,
                // do nothing.
                break;
            default:
                // In case of error code.
                handleError(sendObj, "Request error code " + res.statusCode);
                break;
        }
    });

    req.on('timeout', () => {
        req.abort();
    });

    req.on('error', (err) => {
        handleError(sendObj, err.message);
    });

    // Write data to request body.
    sendObj.data && req.write(sendObj.data);

    req.end();
}

function handleError(sendObj, err) {
    retran.insert(sendObj);
}