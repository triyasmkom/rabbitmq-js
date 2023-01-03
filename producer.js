const amqp = require('amqplib')
const rabbitMQSetting = {
    protocol:'amqp',
    port: 5672,
    hostname: 'localhost',
    username: 'guest',
    password: 'guest',
    vhost: '/',
    authMechanism: ['PLAIN', 'AMQPLAIN', 'EXTERNAL']
}


connect()

async function connect(){

    const queue = "test queue"
    const  message = [
        {"name": "triyas", "enterprise": "Youtube"},
        {"name": "triyas", "enterprise": "Facebook"},
        {"name": "triyas", "enterprise": "Google"},
        {"name": "triyas", "enterprise": "Twitter"}
    ]
    try {
        const conn = await amqp.connect(rabbitMQSetting);
        console.log("Connection created ...")

        const channel = await conn.createChannel();
        console.log("Channel created ...")

        const res = await channel.assertQueue(queue);
        console.log("Queue created ...")

        for(let msg in message){
            await channel.sendToQueue(queue, Buffer.from(JSON.stringify(message[msg])))
            console.log(`Message sent to ${queue} | `, message[msg])
        }
    }catch (err){
        console.log(`Error -> ${err}`)
    }
}
