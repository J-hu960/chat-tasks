import { Inject, Injectable } from "@nestjs/common";
import { TASK_REPOSITORY, TaskRepository } from "src/core/domain/calendar-bot/tasks/tasks.repository";
import { GetTasksQuery } from "./get-tasks.query";
import { USER_REPOSITORY, UserRepository } from "src/core/domain/auth/users/user.repository";
import { NonExistingUserError } from "src/core/domain/auth/users/excepcions/NonExistingUser.error";
import { PARTY_REPOSITORY, PartyRepository } from "src/core/domain/calendar-bot/parties/party.repository";


@Injectable()
export class GetTasksQueryHandler{
    constructor(
         @Inject(TASK_REPOSITORY) private tasksRepository:TaskRepository,
         @Inject(USER_REPOSITORY) private readonly usersRepository:UserRepository,
         @Inject(PARTY_REPOSITORY) private readonly partyRepository:PartyRepository
    ){}


    async handle(query:GetTasksQuery){
        const user = await this.usersRepository.findById(query.userId)
        if(!user){
            throw NonExistingUserError.withValue(query.userId);
        }

        const userParties = (await this.partyRepository.getAllPartiesForUser(query.userId)).map(party=>party.id.value)

        const tasks = await this.tasksRepository.getForUserAndDaterange(query.userId,userParties,query.dateStart,query.dateEnd);
        console.log(`tasks found: ${tasks}`)
        return tasks;
    }
}