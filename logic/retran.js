const config = require('../config');

let queue = [];

module.exports = {
    insert(sendObj) {
        sendObj.time = new Date();
        sendObj.counter = sendObj.counter ? sendObj.counter++ : 1;

        if (sendObj.counter <= config.retran.maxReSend) {
            queue.push(sendObj);
        }
    },

    end(uuid) {
        for (let i = 0; i < queue.length; i++) {
            if (queue[i].uuid == uuid) {
                queue.splice(i, 1);
                return;
            }
        }
    }
}

function reSend() {
    for (let i = 0; i < queue.length; i++) {
        let sendObj = queue.splice(i, 1)[0];

        let sendTime = sendObj.time.getTime();
        let sendTimeDelay = sendObj.counter * config.retran.reSendDelayCost;
        let sendTimeDate = new Date(sendTime + sendTimeDelay);

        if (sendTimeDate < new Date()) {
            require('./sender')(sendObj);
        }
        else {
            queue.unshift(sendObj);
        }
    }
}

setInterval(reSend, config.retran.reSendScanInterval);