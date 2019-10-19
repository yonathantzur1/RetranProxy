const http = require('http');

module.exports = {
    sendReq(options, data) {
        const req = http.request(options, (res) => {
            if (res.statusCode != 200) {
                handleError(options);
            }

            res.setEncoding('utf8');

            res.on('end', () => {
                console.log('No more data in response.');
            });
        });

        req.on('timeout', () => {
            req.abort();
        });

        req.on('error', (e) => {
            handleError(options);
        });

        // Write data to request body.
        data && req.write(data);

        req.end();
    }
}

function handleError(options) {
    let x = options;
}