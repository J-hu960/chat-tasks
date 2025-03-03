import { Body, Controller, HttpStatus, Post, Req, Res, UseGuards } from "@nestjs/common";
import { Response,Request } from "express";
import { catchError } from "../../error-handler";
import { RegisterMessageCommandHandler } from "src/core/application/conversations/messages/register-message.command-handler";
import { RegisterMessageCommand } from "src/core/application/conversations/messages/register-message.command";
import { JwtAuthGuard } from "../../auth/authguard";


class RegisterMessageDTO{
    readonly userId:string;
    readonly content:string;
}

@Controller('messages')
export class RegisterMessageController{
    constructor(
        private readonly registerMessageCommandHandler:RegisterMessageCommandHandler
    ){}

    @UseGuards(JwtAuthGuard)
    @Post()
    handle(      
        @Req() request: Request,
        @Body() registerMessageDTO:RegisterMessageDTO,
        @Res() response:Response){
        try {
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