var amqp = require('amqplib/callback_api');

const ex_fanout = "fanout_exchange";
const ex_direct = "direct_exchange";
const ex_topic = "topic_exchange";
const ex_header = "header_exchange";

var keys = process.argv.slice(2);
var headerOpts = null;
if (keys.length == 0) {
    keys = [ "" ];
}
else{
    if (keys[0] == "Headers"){
        keys[0] = "UsingHeaders";
        headerOpts = { 'Shared': 'all', 'Unique': 'only', 'x-match': 'any' }
    }
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
        channel.assertExchange(ex_header, "headers", { durable: false });

        channel.assertQueue("", {
            durable: false
        }, function (error2, q) {
            if (error2) {
                throw error2;
            }

            console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", q.queue);
            console.log();
            console.log("Routing Keys bound: ");
            console.log(keys);
            console.log("Headers Attached: ");
            console.log(headerOpts);
            console.log();

            for (let k of keys) {
                channel.bindQueue(q.queue, ex_fanout, k);
                channel.bindQueue(q.queue, ex_direct, k);
                channel.bindQueue(q.queue, ex_topic, k);
                channel.bindQueue(q.queue, ex_header, k, headerOpts);
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
