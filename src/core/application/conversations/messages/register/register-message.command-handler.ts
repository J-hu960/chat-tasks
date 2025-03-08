import { CommandHandler } from "../../../../domain/command-handler";
import { RegisterMessageCommand } from "./register-message.command";
import { EventPublisher } from "../../../../domain/event-publisher";
import { Inject } from "@nestjs/common";
import { EVENTEMMITER_NEST } from "../../../../infrastructure/eventPublisher";
import {Message} from '../../../../domain/calendar-bot/messages/message.entity'
import { MESSAGE_REPOSITORY, MessagesRepository } from "../../../../domain/calendar-bot/messages/messages.repository";

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