# RabbitMQ-Tutorials (WIP)
#### Implementation of RabbitMQ following RabbitMQ tutorials (in javascript)

This series of tutorials follows the javascript chain of tutorials from here:  
https://www.rabbitmq.com/getstarted.html

## Prerequesites
##### Check you have the following prerequisites before continuing.
**Note:** _Tutorial created and ran from windows 10 environment.  Project may need alterations for other environments_
______________________________________
1) Must have installed nodejs.
    * Download for nodejs can be found here:
    * https://nodejs.org/en/download/
2) Must have docker installed and running
    * Information on installing and running docker can be found here:
    * https://docs.docker.com/docker-for-windows/install/
    **Note:** _Used docker to run rabbitmq instead of installing rabbitmq dependencies locally.  To install rabbitmq locally instead, follow instructions here:_ _https://www.rabbitmq.com/install-windows.html_
______________________________________
## Getting and Setting Up This Project
##### Cloning the project from github and installing the dependencies with node-package-manager (npm).
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

To run the hello-world example, first, run the receiver app to consume the message.  
`npm run receive-1`

 Run the sender.js  
`npm run send-1`

When prompted, type the message you would like to send to the receiver script and press enter.
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

If we repeat the same experiment and kill one of the receiving terminals before it has a chance to finish processing the task, the task will be re-assigned to the other receiving terminal(s).  This is because acknowledge has been turned on.  Otherwise, incomplete tasks will be lost when the receiver closes.  The sender has _persistent_ set to _true_.  Otherwise, RabbitMQ will forget about the tasks it had in queue when restarted. 

**Note:** _message persistence isn't strong and message can still be lost, if you absolutely cannot lose messages, use Publisher Confirms._ 
_https://www.rabbitmq.com/confirms.html_

##### An Explaination
> Explaination of what is happening here... (WIP)
______________________________________

## 3 Publish Subscribe  
##### Example publish and subscribe pattern  
**project:** _./src/3-publish-subscribe_  
______________________________________

To run the publish-subscribe example, open at least two terminals and run the receiver script in each terminal.  
`npm run receive-3`

Open one new terminal and run the sender script.  
`npm run send-3`

When prompted, type the message you would like to send to the receiver script and press enter.
You will see the message you just sent from the sender script in all the receiver script outputs.

##### An Explaination
> Explaination of what is happening here... (WIP)
______________________________________

## 4 Routing
##### Publishing to only specific queue(s).
**project:** _./src/4-routing_  
______________________________________

To run the routing example, open at least two terminals and run the receiver script in each terminal.  
`npm run receive-4`

When prompted, enter either _route1_ or _route2_ and hit _enter_.  For this demo, make sure at least one terminal was entered with _route1_ and at least one was entered with _route2_.  This will bind _route1_ or _route2_ as a routing key for the queue that the receiver script creates.  These queues are already bound with the _all_ routing key.

Open one new terminal and run the sender script.  
`npm run send-4`

The sender will immidiately send three direct messages.  One routing to _all_, one routing to _route1_, and one routing to _route2_.  You should see all reciever terminals display the message **this message is sent to queues with the routine key "all"**.  Receiver terminals specified with _route1_ will see **this message is sent to queues with the routine key "route1"** and receiver terminals specified with _route2_ will see **this message is sent to queues with the routine key "route2"**.

##### An Explaination
> Explaination of what is happening here... (WIP)
______________________________________

## 5 Topics
##### Publishing to only specific queue(s).
**project:** _./src/5-topics_
______________________________________



##### An Explaination
> Explaination of what is happening here... (WIP)
______________________________________