import { Body, Controller, HttpStatus, Post, Req, Res, UseGuards } from "@nestjs/common";
import { Response,Request } from "express";
import { catchError } from "../../error-handler";
import { RegisterMessageCommandHandler } from "src/core/application/calendar-bot/messages/register/register-message.command-handler";
import { RegisterMessageCommand } from "src/core/application/calendar-bot/messages/register/register-message.command";
import { AuthGuard } from "../../auth/nest_authguard";


class RegisterMessageDTO{
    readonly userId:string;
    readonly content:string;
}

@Controller('messages')
export class RegisterMessageController{
    constructor(
        private readonly registerMessageCommandHandler:RegisterMessageCommandHandler
    ){}

    @UseGuards(AuthGuard)
    @Post()
    handle(      
        @Req() request: Request,
        @Body() registerMessageDTO:RegisterMessageDTO,
        @Res() response:Response){
        try {
            console.log(request['user'])
            this.registerMessageCommandHandler.handle(
                new RegisterMessageCommand(registerMessageDTO.userId,registerMessageDTO.content)
            );

            response.status(HttpStatus.CREATED).send()
        } catch (error) {
            catchError(error,response)
            return
        }
    }
}