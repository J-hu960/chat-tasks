import { TASK_REPOSITORY, TaskRepository } from "src/core/domain/calendar-bot/tasks/tasks.repository";
import { DeleteTaskCommand } from "./delete-task.command";
import { DeletionNotAuthorized } from "src/core/domain/calendar-bot/tasks/excepcions/DeletionNotAuthorized";
import { Inject, Injectable } from "@nestjs/common";

@Injectable()
export class DeleteTaskCommandHandler{
    constructor(
        @Inject(TASK_REPOSITORY) private readonly tasksRepository:TaskRepository
    ){}

    handle(command:DeleteTaskCommand,token_id:string){
        console.log(token_id,command.user_id)
        if(command.user_id != token_id){
            throw DeletionNotAuthorized.create()
        }

        this.tasksRepository.delete(command.task_id)

    }
}