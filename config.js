module.exports = {
    server: {
        port: 4000,
        reqDataSizeLimit: '15mb'
    },
    target: {
        address: "localhost",
        port: "8000",
        timeout: 10000 // milliseconds
    },
    retran: {
        maxSendTries: 20,
        scanReSendInterval: 60000 // milliseconds
    }
}