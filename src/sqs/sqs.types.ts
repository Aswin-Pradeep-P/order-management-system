export interface SQSMessage{
 type: SQSMessageType;
 payload: any;
}

export enum SQSMessageType{
 OrderCreated = 'OrderCreated'
}