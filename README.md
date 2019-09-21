# RabbitMQ-Tutorials
#### Implementation of RabbitMQ following RabbitMQ tutorials (in javascript)

This series of tutorials follows the javascript chain of tutorials from here:  
https://www.rabbitmq.com/getstarted.html

## Prerequesites
______________________________________
______________________________________
##### Check you have the following prerequisites before continuing.
**Note:** _Tutorial created and ran from window 10 environment.  Project may need alterations for other environments_
______________________________________
1) Must have installed nodejs.
    * Download for nodejs can be found here:
    * https://nodejs.org/en/download/
2) Must have docker installed and running
    * Information on installing and running docker can be found here:
    * https://docs.docker.com/docker-for-windows/install/
______________________________________
## Getting and Setting Up This Project
______________________________________
______________________________________
##### Run these commands with command prompt or bash terminal.
______________________________________
git the project with  
`git clone https://github.com/stephenwike/RabbitMQ-Tutorials.git`

navigate to the project root  
`cd RabbitMQ-Tutorials`

install npm dependencies
`npm install`
______________________________________

## All projects are run with npm scripts
______________________________________
______________________________________
##### Here is a list of all npm scripts in this project.
______________________________________
```
npm run [script]
scripts:
        start-rabbitmq
        stop-rabbitmq
        restart-rabbitmq
        send-[n]
            - where n is the project number
        receive-[n]
            - where n is the project number
```
______________________________________

## 0: RabbitMQ
______________________________________
______________________________________
##### Before running any tutorial, start this project to create a rabbitmq docker container.
**project:** _./src/0-rabbitmq_
______________________________________
##### Run these commands with command prompt or bash terminal.

______________________________________
start rabbitmq
`npm run start-rabbitmq`

other rabbitmq options:  
stop rabbitmq
`npm run stop-rabbitmq`

restart rabbitmq
`npm run restart-rabbitmq`
______________________________________

## 1: HelloWorld
______________________________________
______________________________________
##### Sending and receiving a simple message.
**project:** _./src/1-hello-world_
______________________________________

To run the hello-world example, first run the sender.js
`npm run send-1`

When prompted, type the message you would like to send to the receiver script and press enter.

Run the receiver app to consumer the message.
`npm run receive-1`

You will see the message you just sent from the sender script in the output from the receiver script.
______________________________________
## 2 Work Queues
______________________________________
______________________________________
##### Sending and receiving a task to be completed at a later time. (a.k.a Task Queues)
**project:** _./src/2-work-queues_
______________________________________
