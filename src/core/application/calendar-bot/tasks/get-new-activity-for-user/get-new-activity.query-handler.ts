import { USER_REPOSITORY, UserRepository } from "src/core/domain/auth/users/user.repository";
import { GetNewActivityQuery } from "./get-new-activity.query";
import { TASK_REPOSITORY, TaskRepository } from "src/core/domain/calendar-bot/tasks/tasks.repository";
import { NonExistingUserError } from "src/core/domain/auth/users/excepcions/NonExistingUser.error";
import { PARTY_REPOSITORY, PartyRepository } from "src/core/domain/calendar-bot/parties/party.repository";
import { Inject, Injectable, Logger } from "@nestjs/common";
import { LOGGER_SYMBOL } from "src/core/domain/logger.interface";

@Injectable()
export class GetNewActivityQueryHandler{
    constructor(
       @Inject(USER_REPOSITORY) private readonly usersRepository:UserRepository,
       @Inject(TASK_REPOSITORY) private readonly tasksRepository:TaskRepository,
       @Inject(PARTY_REPOSITORY) private readonly partyRepository:PartyRepository,
        @Inject(LOGGER_SYMBOL) private readonly logger:Logger
       
    ){}

    async handle(query:GetNewActivityQuery){

        const user = await this.usersRepository.findById(query.user_id);
        console.log(user)
        if(!user){
            throw NonExistingUserError.withValue(query.user_id);
        }

        const userParties = (await this.partyRepository.getAllPartiesForUser(query.user_id)).map(party=>party.id.value)
        
        this.logger.debug(`checking activity for user ${query.user_id}, in parties: ${userParties} and date superior to ${user.last_check}`)

        const tasks = await this.tasksRepository.getNewActivityForUser(query.user_id,userParties,user.last_check);

        return tasks;
    }
}