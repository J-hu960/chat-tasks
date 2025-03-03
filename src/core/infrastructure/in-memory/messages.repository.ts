import { Message } from "src/core/domain/conversations/messages/message.entity";
import { MessagesRepository } from "src/core/domain/conversations/messages/messages.repository";
import { Id } from "src/core/domain/id";

export class MessagesRepositoryInmemory implements MessagesRepository{
    readonly messages:Message[] = [];
    save(message: Message): void {
        this.messages.push(message);
        console.log(`message with id: ${message.id.value} saved`)
    }
    exists(id: string): boolean {
        return this.messages.some(msg=>msg.userId.value === id)
    }

    getMessages(){
        return this.messages;
    }
}