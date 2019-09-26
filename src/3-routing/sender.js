var amqp = require('amqplib/callback_api');

const fanout_type = "fanout";
const direct_type = "direct";
const topic_type = "topic";

const ex_fanout = fanout_type + "_exchange";
const ex_direct = direct_type + "_exchange";
const ex_topic = topic_type + "_exchange";

amqp.connect('amqp://localhost', function (error0, connection) {
    if (error0) {
        throw error0;
    }
    connection.createChannel(function (error1, channel) {
        if (error1) {
            throw error1;
        }

        channel.assertExchange(ex_fanout, fanout_type, { durable: false });
        channel.assertExchange(ex_direct, direct_type, { durable: false });
        channel.assertExchange(ex_topic, topic_type, { durable: false });

        Publish(channel, ex_fanout, fanout_type, 'doesntmatter');

        Publish(channel, ex_direct, direct_type, 'example.message');
        Publish(channel, ex_direct, direct_type, 'example.topic');
        Publish(channel, ex_direct, direct_type, 'different.longer.extended');

        Publish(channel, ex_topic, topic_type, 'example.message');
        Publish(channel, ex_topic, topic_type, 'example.topic.extra');
        Publish(channel, ex_topic, topic_type, 'different.longer.extended');


        console.log(" [x] Messages Sent");
    });
    setTimeout(function () {
        connection.close();
        process.exit(0);
    }, 500);
});

function Publish(channel, exchange, type, key, options)
{
    var msg = Buffer.from(`This message was sent from exchange of type "${type}" providing key "${key}".`);
    console.log(`   - Publishing Message : ${msg}`);
    channel.publish(exchange, key, msg, options);
}