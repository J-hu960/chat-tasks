import { BadInputForUser } from "src/core/domain/auth/users/excepcions/InvalidUserInput.error";
import { USER_REPOSITORY, UserRepository } from "src/core/domain/auth/users/user.repository";
import { Inject, Injectable } from "@nestjs/common";
import { ENCRYPTION_SERVICE, EncryptionService } from "src/core/domain/auth/CryptService";
import { User } from "src/core/domain/auth/users/user.entity";
import { AUTH_TOKEN_SERVICE, AuthTokenService } from "src/core/infrastructure/auth/services/jwt.service";
import { RegisterUserCommand } from "./register-user.command";

@Injectable()
export class RegisterUserCommandHandler{
    constructor(
        @Inject(USER_REPOSITORY) private readonly userRepository:UserRepository,
        @Inject(ENCRYPTION_SERVICE) private readonly encryptionService:EncryptionService,
        @Inject(AUTH_TOKEN_SERVICE) private readonly tokenService:AuthTokenService
    ){}

   async handle(command:RegisterUserCommand){
        if(command.password !== command.repeatedPassord){
            throw BadInputForUser.withValue(command.password);
        }

        let user:User|undefined = await this.userRepository.findByMail(command.mail);
        
        if(user && user.id){
            throw BadInputForUser.withValue(command.mail);
        }
        const hashed_password = await this.encryptionService.hash(command.password);

        user = User.create(command.username,hashed_password,command.mail);

        this.userRepository.save(user);

        const jwt = await this.tokenService.generateToken(user.id.value);


        return {jwt,user}

    }
}