# RabbitMQ-Tutorials
#### Implementation of RabbitMQ following RabbitMQ tutorials (in javascript)

This series of tutorials follows the javascript chain of tutorials from here:  
https://www.rabbitmq.com/getstarted.html

## Prerequesites
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
git the project with  
`git clone https://github.com/stephenwike/RabbitMQ-Tutorials.git`

navigate to the project root  
`cd RabbitMQ-Tutorials`

install npm dependencies  
`npm install`
______________________________________

## All projects are run with npm scripts
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
##### Before running any tutorial, run rabbitmq docker container.
**project:** _./src/0-rabbitmq_
______________________________________
start rabbitmq  
`npm run start-rabbitmq`

##### Here are some more commands to control rabbitmq.  (Only Use as needed)
stop rabbitmq  
`npm run stop-rabbitmq`

restart rabbitmq  
`npm run restart-rabbitmq`
______________________________________

## 1: HelloWorld
##### Sending and receiving a simple message.
**project:** _./src/1-hello-world_
______________________________________

To run the hello-world example, first run the sender.js  
`npm run send-1`

When prompted, type the message you would like to send to the receiver script and press enter.

Run the receiver app to consumer the message.  
`npm run receive-1`

You will see the message you just sent from the sender script in the output from the receiver script.

##### An Explaination
> Explaination of what is happening here... (WIP)
______________________________________

## 2 Work Queues
##### Sending and receiving a task to be completed at a later time. (a.k.a Task Queues)
**project:** _./src/2-work-queues_
______________________________________

Open up at least two terminals and run a receiver on each one.  
Run the receiver.js  
`npm run receiver-2`

Open up one terminal and run a sender.  
Run the sender.js  
`npm run send-2`

The sender will immediately send 12 tasks for the receiver to process.  
The recievers take turns receiving the tasks in round robin order.  
The tasks are processed in parallel.  

You may notice a delay between when the tasks are received and when the tasks are processed.  

**-output-**
> _[x]_ _Received_ 'your message'
>  _Processing..._
> **... (some delay)**
> _[x]_ _Done_

##### An Explaination
> Explaination of what is happening here... (WIP)
______________________________________

## 2 Publish Subscribe
##### Example publish and subscribe pattern
**project:** _./src/3-publish-subscribe_
______________________________________
