import { Inject, Injectable } from "@nestjs/common";
import { TASK_REPOSITORY, TaskRepository } from "src/core/domain/calendar-bot/tasks/tasks.repository";
import { GetTasksQuery } from "./get-tasks.query";
import { USER_REPOSITORY, UserRepository } from "src/core/domain/auth/users/user.repository";
import { NonExistingUserError } from "src/core/domain/auth/users/excepcions/NonExistingUser.error";


@Injectable()
export class GetTasksQueryHandler{
    constructor(
         @Inject(TASK_REPOSITORY) private tasksRepository:TaskRepository,
         @Inject(USER_REPOSITORY) private readonly usersRepository:UserRepository
    ){}


    handle(query:GetTasksQuery){
        const user = this.usersRepository.findById(query.userId)
        if(!user){
            throw NonExistingUserError.withValue(query.userId);
        }

        const tasks = this.tasksRepository.getForUserAndDaterange(query.userId,query.dateStart,query.dateEnd);
        return tasks;
    }
}