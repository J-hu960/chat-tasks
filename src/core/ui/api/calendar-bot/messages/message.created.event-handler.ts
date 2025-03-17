import { Inject, Injectable } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";
import { MessageCreatedEvent } from "src/core/domain/calendar-bot/messages/message-created.event";
import { LLMService, LLMSERVICE } from "src/core/domain/calendar-bot/tasks/LLM-service";
import { TASK_REPOSITORY, TaskRepository } from "src/core/domain/calendar-bot/tasks/tasks.repository";
import { UserId } from "src/core/domain/auth/users/value-objects/id";
import { EventPublisher } from "src/core/domain/event-publisher";
import { EVENTEMMITER_NEST } from "src/core/infrastructure/eventPublisher";
import { PARTY_REPOSITORY, PartyRepository } from "src/core/domain/calendar-bot/parties/party.repository";

@Injectable()
export class ReservationCreatedHandler {
    constructor(
      @Inject(LLMSERVICE) private readonly llmService:LLMService,
      @Inject(TASK_REPOSITORY) private readonly taskRepository :TaskRepository,
      @Inject(PARTY_REPOSITORY) private readonly partyRepository :PartyRepository,
      @Inject(EVENTEMMITER_NEST) private readonly eventPublisher:EventPublisher
    ) {}
  
    @OnEvent(MessageCreatedEvent.Type)
    async handle(event: MessageCreatedEvent) {
      const userId = UserId.fromExisting(event.payload.userId);
      const user_parties = await this.partyRepository.getAllPartiesForUser(userId.value);
      const task = await this.llmService.generateTask(event.payload.content,userId,user_parties);
      console.log(task.party_id)
      this.taskRepository.save(task);
      this.eventPublisher.publish(task.releaseEvents());
      // console.log(this.taskRepository.getTasks())
      
    }
  }
  

