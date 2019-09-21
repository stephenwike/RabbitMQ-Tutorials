var amqp = require('amqplib/callback_api');
var msg;

const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

readline.question(`What's message would you like to send?`, (val) => {
    console.log(`echo -> ${val}`);
    msg = val;
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
    
            var queue = 'hello';
    
            channel.assertQueue(queue, {
                durable: false
            });
            channel.sendToQueue(queue, Buffer.from(msg));
    
            console.log(" [x] Sent %s", msg);
        });
        setTimeout(function () {
            connection.close();
            process.exit(0);
        }, 500);
    });
}
