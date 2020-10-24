import { Message } from "node-nats-streaming";
import { Listener } from './base-listener';
import { Subjects } from "./subjects";
import { TicketCreatedEvent } from './ticket-created-event';

export class TicketCreatedListener extends Listener<TicketCreatedEvent> {
    readonly subject =  Subjects.TicketCreated;
    queueGroupName = 'payment-service';
    
    //data will be an object with an id, title, and price properties
    //defined in the data property of the class TicketCreatedEvent
    onMessage(data: TicketCreatedEvent['data'], message: Message): void {
       console.log('Event data!', data);

       message.ack();
    }    
}