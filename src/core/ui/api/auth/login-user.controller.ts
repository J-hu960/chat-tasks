import { Body, Controller, HttpStatus, Post, Res } from "@nestjs/common";
import { Response } from "express";
import { catchError } from "../error-handler";
import { LogInUserCommandHandler } from "src/core/application/auth/login/login-user.command-handler";
import { LoginUserCommand } from "src/core/application/auth/login/login-user.command";

class LoginUserDTO{
    constructor(
        readonly username:string,
        readonly mail:string,
        readonly password:string,
        readonly repeatedPassord:string
    ){}
}
@Controller()
export class LoginUserController{

    constructor(
        private readonly logInUserCommanHandler:LogInUserCommandHandler
    ){}

    @Post('log-in')
   async handle(@Body() loginUserDTO:LoginUserDTO, @Res() response:Response){
        try {

            const {jwt,user_id} = await this.logInUserCommanHandler.handle(
                new LoginUserCommand(loginUserDTO.mail,loginUserDTO.password)
            )
            console.log(`sending back token: ${jwt} and id: ${user_id}`)
            response.status(HttpStatus.CREATED).send({token:jwt,id:user_id});
           
        } catch (error) {
            catchError(error,response)
            return
            
        }
    }


}