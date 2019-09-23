var amqp = require('amqplib/callback_api');
var route;

const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

readline.question(`What route would you like to add? (type route1 or route2)\r\n`, (val) => {
    console.log(`echo -> ${val}`);
    route = val;
    SendMessage();
    readline.close();
});

function SendMessage() {
    amqp.connect('amqp://localhost', function (error0, connection) {
        if (error0) {
            throw error0;
        }
        connection.createChannel(function (error1, channel) {
            if (error1) {
                throw error1;
            }

            var exchange = 'routing';

            channel.assertExchange(exchange, 'direct', {
                durable: false
            });

            channel.assertQueue("", {
                durable: false
            }, function (error2, q) {
                if (error2) {
                    throw error2;
                }

                console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", q.queue);

                channel.bindQueue(q.queue, exchange, 'all');
                channel.bindQueue(q.queue, exchange, route);

                channel.consume(q.queue, function (msg) {
                    if (msg.content) {
                        console.log(" [x] %s", msg.content.toString());
                    }
                }, {
                    noAck: true
                });
            });
        });
    });
}
