import { USER_REPOSITORY, UserRepository } from "src/core/domain/auth/users/user.repository";
import { UpdateLastActivityCheckCommand } from "./update-lastActivityCheck.command";
import { Inject, Injectable } from "@nestjs/common";

@Injectable()
export class UpdateLastActivityCheckCommandHandler{
    constructor(
        @Inject(USER_REPOSITORY) private readonly usersRepository:UserRepository
    ){}

    async handle(command:UpdateLastActivityCheckCommand){
        const last_date = new Date;
        await this.usersRepository.updateUserLastCheckActivity(command.user_id,last_date);

    }
}