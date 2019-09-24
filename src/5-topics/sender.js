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

        channel.assertExchange(exchange, "topic", {
            durable: false
        });

        channel.publish(exchange, 'red.paris', Buffer.from('will sent to keys "red.paris", "[* or #].paris", "red.[* or #], "*.*" "#"'));
        channel.publish(exchange, 'green.paris', Buffer.from('will sent to keys "green.paris", "[* or #].paris", "green.[* or #], "*.*" "#"'));
        channel.publish(exchange, 'blue.paris', Buffer.from('will sent to keys "blue.paris", "[* or #].paris", "blue.[* or #], "*.*" "#"'));

        channel.publish(exchange, 'red.london', Buffer.from('will sent to keys "red.london", "[* or #].london", "red.[* or #], "*.*" "#"'));
        channel.publish(exchange, 'green.london', Buffer.from('will sent to keys "green.london", "[* or #].london", "green.[* or #], "*.*" "#"'));
        channel.publish(exchange, 'blue.london', Buffer.from('will sent to keys "blue.london", "[* or #].london", "blue.[* or #], "*.*" "#"'));

        channel.publish(exchange, 'red.venice', Buffer.from('will sent to keys "red.venice", "[* or #].venice", "red.[* or #], "*.*" "#"'));
        channel.publish(exchange, 'green.venice', Buffer.from('will sent to keys "green.venice", "[* or #].venice", "green.[* or #], "*.*" "#"'));
        channel.publish(exchange, 'blue.venice', Buffer.from('will sent to keys "blue.venice", "[* or #].venice", "blue.[* or #], "*.*" "#"'));
        console.log(" [x] Messages Sent");
    });
    setTimeout(function () {
        connection.close();
        process.exit(0);
    }, 500);
});