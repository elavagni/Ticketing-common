import nats from 'node-nats-streaming';
import { TicketCreatedEventPublisher } from './events/ticket-created-publisher';


console.clear();

//stan is the stardard name for the client
const stan = nats.connect('ticketing', 'abc', { 
    url: 'http://localhost:4222'
});

stan.on('connect', async () => {
    console.log('Publisher connected to NATS');

    try {
        const publisher = new TicketCreatedEventPublisher(stan);
        await publisher.publish({
            id: '123',
            title: 'concert',
            price: 20,
            userId:'3254354'
        });
    } catch (error) {
        console.error(error);
    }
});
