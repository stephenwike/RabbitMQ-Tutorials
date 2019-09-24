var amqp = require('amqplib/callback_api');
var _msg;
var _connection;
var _channel;
const _queue = 'hello';

const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

// Start
Start();

function Start() {
    Connect();

    setTimeout(GetInput, 1000);
}

function GetInput() {
    
    readline.question(`What's message would you like to send? (Type 'q' to quit)\r\n`, (val) => {
        console.log(`Entered: ${val}`);

        if (val == 'q' || val == 'quit') {
            Quit(0);
        }
        else {
            _msg = val;
            SendMessage();
        }
    });
}

function Connect() {
    amqp.connect('amqp://localhost', (error0, connection) => {
        if (error0) {
            throw error0;
        }
        _connection = connection;
        connection.createChannel((error1, channel) => {
            if (error1) {
                throw error1;
            }
            _channel = channel;

            _channel.assertQueue(_queue, {
                durable: false
            });
        });
    });
}

function SendMessage() {
    _channel.sendToQueue(_queue, Buffer.from(_msg));
    console.log(" [x] Sent: %s", _msg);

    GetInput();
}

function Quit(code) {
    console.log("Goodbye.");
    _connection.close();
    process.exit(code);
}

