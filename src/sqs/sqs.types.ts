export interface SQSMessage{
 type: SQSMessageType;
 payload: object;
}

export enum SQSMessageType{
 OrderCreated = 'OrderCreated'
}