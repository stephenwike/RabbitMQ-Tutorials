var amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost', function (error0, connection) {
    if (error0) {
        throw error0;
    }
    connection.createChannel(function (error1, channel) {
        if (error1) {
            throw error1;
        }

        var queue = 'workqueue';

        channel.assertQueue(queue, {
            durable: true
        });

        for (var i = 1; i < 13; ++i) {
            var msg = "This is task " + i + "!  This task will be processed by the receiver.";
            channel.sendToQueue(queue, Buffer.from(msg), {
                persistent: true
            });

            console.log(" [x] Sent %s", msg);
        }
    });
    setTimeout(function () {
        connection.close();
        process.exit(0);
    }, 500);
});
