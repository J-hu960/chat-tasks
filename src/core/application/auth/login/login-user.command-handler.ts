import { Inject, Injectable } from "@nestjs/common";
import { USER_REPOSITORY, UserRepository } from "src/core/domain/auth/users/user.repository";
import { ENCRYPTION_SERVICE, EncryptionService } from "src/core/domain/auth/CryptService";
import { AUTH_TOKEN_SERVICE } from "src/core/infrastructure/auth/services/jwt.service";
import { AuthTokenService } from "src/core/domain/auth/AuthService";
import { NonExistingUserError } from "src/core/domain/auth/users/excepcions/NonExistingUser.error";
import { BadInputForUser } from "src/core/domain/auth/users/excepcions/InvalidUserInput.error";
import { LoginUserCommand } from "./login-user.command";


@Injectable()
export class LogInUserCommandHandler{
    constructor(
         @Inject(USER_REPOSITORY) private readonly userRepository:UserRepository,
         @Inject(ENCRYPTION_SERVICE) private readonly encryptionService:EncryptionService,
         @Inject(AUTH_TOKEN_SERVICE) private readonly tokenService:AuthTokenService      
    ){
    }
    async handle(command:LoginUserCommand){
        const user = await this.userRepository.findByMail(command.mail);

        if(!user){
            throw NonExistingUserError.withValue(command.mail);
        }

        if(!this.encryptionService.compare(command.password,user.password.hashed)){
            throw BadInputForUser.withValue(command.password);
        }

        const jwt = await this.tokenService.generateToken(user.id.value);

        return jwt;
        
    }
}