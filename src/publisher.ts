import nats from 'node-nats-streaming';

console.clear();

//stan is the stardard name for the client
const stan = nats.connect('ticketing', 'abc', { 
    url: 'http://localhost:4222'
});

stan.on('connect', () => {
    console.log('Publisher connected to NATS');

    const data = JSON.stringify ({
        id:'123',
        tite: 'Concert',
        price: 20
    });

    stan.publish('ticket:created', data,  () => {
        console.log('Event published');
    });
});
