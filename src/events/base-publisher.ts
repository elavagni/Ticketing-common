import { Stan } from 'node-nats-streaming';
import { PrimaryExpression } from 'typescript';
import { Subjects } from './subjects';

interface Event {
    subject: Subjects;
    data: any;
}

export abstract class Publisher<T extends Event>  {
    abstract subject: T['subject'];
    protected client: Stan;

    constructor( client: Stan) {
        this.client = client;
    }

    publish(data:T['data']): Promise<void> {
        return  new Promise((resolve, reject) => {
            this.client.publish(this.subject, JSON.stringify(data), (error) => {
                if (error) {
                    return(reject(error));
                }  
                console.log('Event Published to subject', this.subject);
                resolve();                
            });
        })


   
    }
}