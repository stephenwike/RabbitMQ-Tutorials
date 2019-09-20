var amqp = require('amqplib/callback_api');
const io = require('console-read-write');

amqp.connect('amqp://localhost', function (error0, connection) {
    if (error0) {
        throw error0;
    }
    connection.createChannel(function (error1, channel) {
        if (error1) {
            throw error1;
        }

        var queue = 'hello';
        var msg = GetMessage();
        // GetMessage().then(val => {
        //     msg = val;
        // });

        channel.assertQueue(queue, {
            durable: false
        });
        channel.sendToQueue(queue, Buffer.from(msg));

        console.log(" [x] Sent %s", msg);
    });
    setTimeout(function () {
        connection.close();
        process.exit(0);
    }, 5000);
});

function GetMessage() {
    io.write('What message would you like to send?');
    
    return '' + io.read();
}