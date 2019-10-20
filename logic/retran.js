const config = require('../config');

let queue = [];

module.exports = {
    insert(sendObj) {
        sendObj.time = new Date();
        sendObj.counter = sendObj.counter ? sendObj.counter++ : 1;

        if (sendObj.counter <= config.retran.maxSendTries) {
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
    let deleteIndexes = [];

    for (let i = 0; i < queue.length; i++) {
        let sendObj = queue[i];

        let sendTime = sendObj.time.getTime();
        let sendTimeDelay = sendObj.counter * 30000;
        let sendTimeDate = new Date(sendTime + sendTimeDelay);

        if (sendTimeDate < new Date()) {
            require('./sender')(sendObj);
            deleteIndexes.push(i);
        }
    }

    deleteIndexes.forEach(index => {
        queue.splice(index, 1);
    })
}

setInterval(reSend, config.retran.scanReSendInterval);