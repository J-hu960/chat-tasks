import { Inject, Injectable } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";
import { MessageCreatedEvent } from "src/core/domain/calendar-bot/messages/message-created.event";
import { LLMService, LLMSERVICE } from "src/core/domain/calendar-bot/tasks/LLM-service";
import { TASK_REPOSITORY, TaskRepository } from "src/core/domain/calendar-bot/tasks/tasks.repository";
import { UserId } from "src/core/domain/auth/users/value-objects/id";
import { EventPublisher } from "src/core/domain/event-publisher";
import { EVENTEMMITER_NEST } from "src/core/infrastructure/eventPublisher";

@Injectable()
export class ReservationCreatedHandler {
    constructor(
      @Inject(LLMSERVICE) private readonly llmService:LLMService,
      @Inject(TASK_REPOSITORY) private readonly taskRepository :TaskRepository,
      @Inject(EVENTEMMITER_NEST) private readonly eventPublisher:EventPublisher
    ) {}
  
    @OnEvent(MessageCreatedEvent.Type)
    async handle(event: MessageCreatedEvent) {
      const userId = UserId.fromExisting(event.payload.userId)
      const task = await this.llmService.generateTask(event.payload.content,userId);
      this.taskRepository.save(task);
      this.eventPublisher.publish(task.releaseEvents());
      // console.log(this.taskRepository.getTasks())
      
    }
  }
  

