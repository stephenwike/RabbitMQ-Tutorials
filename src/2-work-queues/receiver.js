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

        console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue);

        channel.consume(queue, function (msg) {
            var len = msg.content.toString().length - 1;

            console.log(" [x] Received %s", msg.content.toString());

            console.log(" Processing..." );
            setTimeout(function () {
                console.log(" [x] Done");
            }, len * 6000);
        }, {
            noAck: true
        });
    });
});
