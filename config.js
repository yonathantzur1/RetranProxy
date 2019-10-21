module.exports = {
    server: {
        port: 4000,
        reqDataSizeLimit: '15mb'
    },
    target: {
        address: "localhost",
        port: "8000",
        timeout: 10 // seconds
    },
    retran: {
        maxSendTries: 15,
        sendDelay: 60, // seconds
    }
}