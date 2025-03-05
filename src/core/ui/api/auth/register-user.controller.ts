import { Body, Controller, HttpStatus, Post, Res } from "@nestjs/common";
import { Response } from "express";
import { RegisterUserCommand } from "src/core/application/auth/register-user.command";
import { RegisterUserCommandHandler } from "src/core/application/auth/register-user.command-handler";
import { catchError } from "../error-handler";

class RegisterUserDTO{
    constructor(
        readonly username:string,
        readonly mail:string,
        readonly password:string,
        readonly repeatedPassword:string
    ){}
}
@Controller()
export class RegisterUserController{

    constructor(
        private readonly registerUserCommandHandler:RegisterUserCommandHandler
    ){}

    @Post('sign-up')
   async handle(@Body() registerUserDTO:RegisterUserDTO, @Res() response:Response){
        try {
            const result = await this.registerUserCommandHandler.handle(
                new RegisterUserCommand(
                    registerUserDTO.username,registerUserDTO.mail,
                    registerUserDTO.password,registerUserDTO.repeatedPassword
                )
            )
            await result.jwt

            response.status(HttpStatus.CREATED).send({
                token:result.jwt,
                id:result.user.id.value
            });
            
        } catch (error) {
            catchError(error,response)
            return
            
        }
    }


}