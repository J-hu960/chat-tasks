import { TASK_REPOSITORY, TaskRepository } from "src/core/domain/calendar-bot/tasks/tasks.repository";
import { UpdateTaskCommand } from "./update-task.command";
import { Task } from "src/core/domain/calendar-bot/tasks/task";
import { NonExistingTaskError } from "src/core/domain/calendar-bot/tasks/excepcions/NonExistingTask.error";
import { Inject, Injectable } from "@nestjs/common";

@Injectable()
export class UpdateTaskCommandHandler{
    constructor(
       @Inject(TASK_REPOSITORY) private readonly tasksRepository:TaskRepository
    ){}

   async  handle(command:UpdateTaskCommand){
    console.log(`Command to update: ${command.task_id}`)
        const task = await this.tasksRepository.findById(command.task_id);
        if(!task){
            throw NonExistingTaskError.withId(command.task_id);
        }

        const updatedTask = Task.fromCommand(command);

        this.tasksRepository.update(updatedTask);

    }
}