import { Body, Controller, HttpStatus, Inject, Post, Res } from "@nestjs/common";
import { Response } from "express";
import { catchError } from "../error-handler";
import { LogInUserCommandHandler } from "src/core/application/auth/login/login-user.command-handler";
import { LoginUserCommand } from "src/core/application/auth/login/login-user.command";
import { Logger, LOGGER_SYMBOL } from "src/core/domain/logger.interface";

class LoginUserDTO{
    constructor(
        readonly mail:string,
        readonly password:string,
    ){}
}
@Controller()
export class LoginUserController{

    constructor(
        private readonly logInUserCommanHandler:LogInUserCommandHandler,
        @Inject(LOGGER_SYMBOL) private readonly logger:Logger
    ){}

    @Post('log-in')
   async handle(@Body() loginUserDTO:LoginUserDTO, @Res() response:Response){
        try {
            this.logger.debug(`Trying to log in ${loginUserDTO.mail} with password: ${loginUserDTO.password}`)

            const {jwt,user_id} = await this.logInUserCommanHandler.handle(
                new LoginUserCommand(loginUserDTO.mail,loginUserDTO.password)
            )
            response.status(HttpStatus.CREATED).send({token:jwt,id:user_id});
           
        } catch (error) {
            this.logger.error(error.message,null)
            catchError(error,response)
            return
            
        }
    }


}