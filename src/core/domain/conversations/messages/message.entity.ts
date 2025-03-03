import { AggregateRoot } from "../../aggregate-root";
import { Id } from "../../id";
import { MessageCreatedEvent } from "./message-created.event";
import { MessageContent } from "./value-objects/content";
import { MessageId } from "./value-objects/id";

export class Message extends AggregateRoot{
    private constructor(
        readonly id:MessageId,
        readonly userId:Id,
        readonly content:MessageContent,
        readonly send_at:Date


    ){
        super()
        this.id = id;
        this.userId = userId;
        this.content = content;
        this.send_at = send_at;
    }

    static create(useridStr:string,contentStr:string):Message{
        const userId = Id.fromExisting(useridStr); //TODO: no generar aqui el id
        const content = MessageContent.create(contentStr);
        const id = MessageId.new();
        const send_at = new Date;

        const message = new Message(id,userId,content,send_at);

        message.recordEvent(MessageCreatedEvent.fromMessage(message));

        return message

    }

}