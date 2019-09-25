# RabbitMQ-Tutorials (WIP)
#### Implementation of RabbitMQ following RabbitMQ tutorials (in javascript)

This series of tutorials follows the javascript chain of tutorials from here:  
https://www.rabbitmq.com/getstarted.html

#### **DISCLAIMER:**
Code shown in this tutorial project is for learning purposes only.  This code should not be considered as production ready.  
For a production ready checklist, refer to this article:
_https://www.rabbitmq.com/production-checklist.html_

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
    * Follow instructions for running the docker client.
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
**Note:** _This is just for reference._
**Note:** _All **'npm run'** commands run short scripts defined in the package.json file located at the project root directory._
______________________________________
```
npm run <script>
scripts:
        start-rabbitmq
        stop-rabbitmq
        restart-rabbitmq
        send-<n>
            - where n is the project number
        receive-<n>
            - where n is the project number
        demo-<n>
            - where n is the project number
```
______________________________________

## 0: RabbitMQ
##### Before running any tutorial, run RabbitMQ Docker container.
**project:** _./src/0-rabbitmq_
**Note:** _All commands are run at the project root directory._
______________________________________
start rabbitmq  
`npm run start-rabbitmq`

##### Here are some more commands to control rabbitmq.  (Only use as needed)
stop rabbitmq  
`npm run stop-rabbitmq`

restart rabbitmq  
`npm run restart-rabbitmq`

##### An Explaination
> RabbitMQ is an open source message broker that implements the **Advanced Messaging Queuing Protocol (AMQP)**.  Although this tutorial provides demos as javascript implementations, RabbitMQ supports all major programming languages.  In this first project, we are running a docker-compose command to run a Docker container with RabbitMQ installed and running.  The container is bound and listening to port 5672 which is the default port for RabbitMQ.  This container must be running in order for any other demo to run.  **When done with training demos, stop running the container with 'npm run stop-rabbitmq'**.
______________________________________

## 1: HelloWorld
##### Sending and receiving a simple message.
**project:** _./src/1-hello-world_
______________________________________

To run the hello-world demo:
`npm run demo-1`

**Note:** _Going forward, all producing scripts (script that sends messages) will be run in a green command prompt while all consuming scripts (scripts that receive messages) will be run in red command prompts.  Make sure you close all command prompt windows before moving onto another demo as having multiple unrelated windows could become confusing._

Two console windows should have appeared.  Type a message into the green console and hit **Enter**.

Your message appears in the red console.

Either repeat the process by continuing to enter messages or enter **'q'** to quit.



The producing script asks for console input while the consuming script is actively waiting for messages from the queue.  Ent


When prompted, type the message you would like to send to the receiver script and press enter.
You will see the message you just sent from the sender script in the output from the receiver script.

##### An Explaination
> The producing script creates a connection to RabbitMQ, creates a channel, creates a queue named 'hello', and prompts the user for a message.  The consuming script also creates a connection to RabbitMQ, creates a queue named 'hello', and consumes any messages that come through that queue.  It's important to note that queues are **idempotent**, which means they are only created once.  Notice both the consumer and producer create a queue named 'hello'.  The queue is only actually created by the script that tries to creates it first.  Both queues have to have matching queue arguments or RabbitMQ will raise an error.  Queue arguments will be covered in a later demo.  When a message is entered, the producer sends a message to the queue for the consumer to receive.  The application quits when a message of 'q' is entered.
______________________________________

## 2 Work Queues
##### Sending and receiving a task to be completed at a later time. (a.k.a Task Queues)
**project:** _./src/2-work-queues_
______________________________________

To run the work queues demo:  
`npm run demo-2`

Four console windows should have appeared, one producer and three consumers.

The producer sends twelve tasks for the consumers to _'process'_ (timer running for 5 seconds to simulate a task being processed). 

Each consumer receives 4 tasks and _'processes'_ them asynchronoulsy (at the same time).

Close all windows and run the demo again, but this time close a window or two before the tasks finish _'processing'_ (before you see '**_[X]_ _Done_**'. in the consumer console).

You will notice that incomplete tasks are re-assigned to the remaining consumer(s).

##### Example of output from processing a single task.
> _[x]_ _Received_ 'your message'  
>  _Processing..._  
> **... (some delay)**  
> _[x]_ _Done_  

##### An Explaination
> We start by launching three consumers to start listening on a shared queue.  To create a shared queue, each consumer has to create/assert a queue with a static queue name (**workqueue** in this example).  If a queue is not given a name, RabbitMQ will assign a randomly generated name and each consumer will have it's own queue.  For this demo, we want the consumers to share a queue so they will compete over tasks.  Otherwise, each consumer would get the same twelve tasks, each task being 'processed' three times.  When we send messages from the producer, we set the persistent value of the message to true.  This will make sure the task is not removed from the queue until it has been acknowledged by the consumer.  Each consumer runs the task and upon completeion, it acknowledges the message to mark it for completion.  This is why the tasks get re-assigned to other consumers when a consumer is closed.  The closed consumer was unable to acknowledge the tasks.  Once closed, the unacknowledged tasks are re-assigned to the remaining open consumers.

**Note:** _message persistence isn't strong and message can still be lost, if you absolutely cannot lose messages, use Publisher Confirms._  
_https://www.rabbitmq.com/confirms.html_
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