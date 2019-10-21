const config = require('../config');

let queueMessages = 0;

module.exports = {
    insert(sendObj) {
        if (sendObj.counter) {
            sendObj.counter++;
        }
        else {
            sendObj.counter = 1;
        }

        if (sendObj.counter <= config.retran.maxSendTries) {
            queueMessages++;
            setTimeout(() => {
                require('./sender')(sendObj);
                queueMessages--;
            }, sendObj.counter * config.retran.sendDelay * 1000)
        }
    },

    count() {
        return queueMessages;
    }
}