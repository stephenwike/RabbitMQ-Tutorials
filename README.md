# RabbitMQ-Tutorials
Implementation of RabbitMQ following RabbitMQ tutorials

This series of tutorials follows the javascript chain of tutorials from here:
https://www.rabbitmq.com/getstarted.html

## Getting and Setting Up This Project:
Follow these instructions with command line or bash terminal.
-------------------------------------------------------------------
git the project with 
`git clone https://github.com/stephenwike/RabbitMQ-Tutorials.git`

navigate to the project root
`cd RabbitMQ-Tutorials`

install npm dependencies (may require installing node.js if npm is unrecognized.)
`npm install`
-------------------------------------------------------------------

## 0 RabbitMQ
project src/rabbitmq

This has to be running before any of the other test projects can work.
Run the following commands in command or bash terminal.
-----------------------------------------------------------------
change directory to rabbitmq directory.
```cd src/rabbitmq/```

load docker image of rabbitmq with docker compose.
```docker-compose up -d```
-----------------------------------------------------------------

## 1 HelloWorld
project src/hello-world

If rabbitmq project isn't running.  Follow the instructions on the rabbitmq section before continuing this example.

To run the hello-world example, first run the sender.js
`node sender.js`

When prompted, type the message you would like to send to the receiver script and press enter.

Run the receiver app to consumer the message.
`node receiver.js`

You will see the message you just sent from the sender script in the output from the receiver script.
