var amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost', function (error0, connection) {
    if (error0) {
        throw error0;
    }
    connection.createChannel(function (error1, channel) {
        if (error1) {
            throw error1;
        }

        var exchange = "routing";

        channel.assertExchange(exchange, "direct", {
            durable: false
        });

        channel.publish(exchange, 'all', Buffer.from('this message is sent to queues with the routing key "all"'));
        channel.publish(exchange, 'route1', Buffer.from('this message is send to queues with the routing key "route1"'));
        channel.publish(exchange, 'route2', Buffer.from('this message is send to queues with the routing key "route2"'));
        console.log(" [x] Messages Sent");
    });
    setTimeout(function () {
        connection.close();
        process.exit(0);
    }, 500);
});