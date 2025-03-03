import { CommandHandler } from "../../../domain/command-handler";
import { RegisterMessageCommand } from "./register-message.command";
import { Message } from "../../../domain/conversations/messages/message.entity";
import { MESSAGE_REPOSITORY, MessagesRepository } from "../../../domain/conversations/messages/messages.repository";
import { EventPublisher } from "../../../domain/event-publisher";
import { Inject } from "@nestjs/common";
import { EVENTEMMITER_NEST } from "../../../infrastructure/eventPublisher";

export class RegisterMessageCommandHandler implements CommandHandler{
    constructor(
        @Inject(MESSAGE_REPOSITORY) private readonly messageRepository:MessagesRepository,
        @Inject(EVENTEMMITER_NEST) private readonly eventPublisher:EventPublisher
    ){}

    handle(command:RegisterMessageCommand){

        const message = Message.create(command.userId,command.contetn)

        this.messageRepository.save(message);
        this.eventPublisher.publish(message.releaseEvents());

    }
}