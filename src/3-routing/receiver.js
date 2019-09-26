var amqp = require('amqplib/callback_api');

const ex_fanout = "fanout_exchange";
const ex_direct = "direct_exchange";
const ex_topic = "topic_exchange";

var keys = process.argv.slice(2);
if (keys.length == 0) {
    keys = [ "" ];
}

amqp.connect('amqp://localhost', function (error0, connection) {
    if (error0) {
        throw error0;
    }
    connection.createChannel(function (error1, channel) {
        if (error1) {
            throw error1;
        }

        channel.assertExchange(ex_fanout, "fanout", { durable: false });
        channel.assertExchange(ex_direct, "direct", { durable: false });
        channel.assertExchange(ex_topic, "topic", { durable: false });

        channel.assertQueue("", {
            durable: false
        }, function (error2, q) {
            if (error2) {
                throw error2;
            }

            console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", q.queue);
            console.log();
            console.log("Binding Keys bound: ");
            console.log(keys);
            console.log();

            for (let k of keys) {
                channel.bindQueue(q.queue, ex_fanout, k);
                channel.bindQueue(q.queue, ex_direct, k);
                channel.bindQueue(q.queue, ex_topic, k);
            }

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
