import { DomainEvent } from "../../domain-event";
import { Id } from "../../id";
import { Message } from "./message.entity";
import { MessageId } from "./value-objects/id";


export type MessageCreatedPayload = {
    readonly id:string;
    readonly userId:string;
    readonly content:string;
    readonly send_at:Date
}


export class MessageCreatedEvent extends DomainEvent<MessageCreatedPayload>{
    static Type = "message.created"
    private constructor(messageId:MessageId,payload:MessageCreatedPayload){
        super(messageId,MessageCreatedEvent.Type,payload)
    }

    static fromMessage(message:Message){
        return new MessageCreatedEvent(
            message.id, {
                id:message.id.value,
                userId:message.userId.value,
                content:message.content.content,
                send_at:message.send_at
            }
        )
    }
}