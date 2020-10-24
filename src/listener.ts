import nats,  {Message, Stan} from 'node-nats-streaming';
import { randomBytes } from 'crypto';

console.clear();

const stan = nats.connect('ticketing', randomBytes(4).toString('hex'), {
    url: 'http://localhost:4222'
});

stan.on('connect', () => {
    console.log('Listener connected to NATS');

    const options = stan
    .subscriptionOptions()
    .setManualAckMode(true);

    const subscrption =  stan.subscribe(
        'ticket:created', 
        'orders-service-queue-group', 
        options
    );

    subscrption.on('message', (message : Message) => {

        stan.on('close', () => {
            console.log('NATS connection closed!');
            process.exit();
        });
    
        const data = message.getData();

        if (typeof data === 'string') {
            console.log(`Received event #${message.getSequence()}, with data: ${data}`);
        }
        message.ack();      
    });
});

//Manual restart or shutdown 
process.on('SIGINT', () => stan.close());
//This one won't work in windows
process.on('SIGTERM', () => stan.close());