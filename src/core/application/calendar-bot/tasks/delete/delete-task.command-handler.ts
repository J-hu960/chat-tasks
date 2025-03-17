import { TASK_REPOSITORY, TaskRepository } from "../../../../domain/calendar-bot/tasks/tasks.repository";
import { DeleteTaskCommand } from "./delete-task.command";
import { DeletionNotAuthorized } from "../../../../domain/calendar-bot/tasks/excepcions/DeletionNotAuthorized";
import { Inject, Injectable } from "@nestjs/common";

@Injectable()
export class DeleteTaskCommandHandler{
    constructor(
        @Inject(TASK_REPOSITORY) private readonly tasksRepository:TaskRepository
    ){}

   async  handle(command:DeleteTaskCommand){

         this.tasksRepository.delete(command.task_id)
    }
}