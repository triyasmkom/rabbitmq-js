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
    const enterprise = "Google"
    try {
        const conn = await amqp.connect(rabbitMQSetting);
        console.log("Connection created ...")

        const channel = await conn.createChannel();
        console.log("Channel created ...")

        const res = await channel.assertQueue(queue);
        console.log("Queue created ...")

        console.log(`Wait message ${enterprise}`)
        channel.consume(queue, message=>{
            let employee = JSON.parse(message.content.toString())
            console.log(`Receive message ${employee.name} | ${employee.enterprise}`)
            console.log(employee)

            if(employee.enterprise==enterprise){
                channel.ack(message)
                console.log(`Deleting message from queue\n`)
            } else {}
            console.log(`That message is not for me, I'll not delete it ...`)
        })

    }catch (err){
        console.log(`Error -> ${err}`)
    }
}
