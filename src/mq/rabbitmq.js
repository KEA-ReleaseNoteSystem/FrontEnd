const amqplib = require('amqplib/callback_api');

const url = 'amqp://127.0.0.1:5672';
const queue = 'hello';

amqplib.connect(url, (err, conn) => {
    console.log("connected:");
    if (err) throw err;

    // Listener
    conn.createChannel((err, ch2) => {
        if (err) throw err;

        ch2.assertQueue(queue);

        ch2.consume(queue, (msg) => {
            if (msg !== null) {
                console.log(msg.content.toString());
                ch2.ack(msg);
            } else {
                console.log('Consumer cancelled by server');
            }
        });
    });

    // Sender
    conn.createChannel((err, ch1) => {
        if (err) throw err;

        ch1.assertQueue(queue);

        setInterval(() => {
            ch1.sendToQueue(queue, Buffer.from('something to do'));
        }, 1000);
    });
});


