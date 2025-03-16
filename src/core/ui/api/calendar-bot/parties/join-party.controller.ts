import { Body, Controller, HttpStatus, Post, Put, Req, Res, UseGuards } from "@nestjs/common";
import { Response,Request } from "express";
import { catchError } from "../../error-handler";
import { AuthGuard } from "../../auth/nest_authguard";
import { JoinPartyCommand } from "src/core/application/calendar-bot/parties/join-party/join-party.command";
import { JoinPartyCommandHandler } from "src/core/application/calendar-bot/parties/join-party/join-party.command-handler";


class JoinPartyDTO{
    readonly code:string;
    readonly name:string;

}

@Controller('parties')
export class JoinPartyController{
    constructor(
        private readonly joinPartyCommandHandler:JoinPartyCommandHandler
    ){}

    @UseGuards(AuthGuard)
    @Put()
    handle(      
        @Req() request: Request,
        @Body() joinpartyDTO:JoinPartyDTO,
        @Res() response:Response){
        try {
            const user_id = (request['user'])
            const party = this.joinPartyCommandHandler.handle(
                new JoinPartyCommand(user_id,joinpartyDTO.name,joinpartyDTO.code)
            );

            response.status(HttpStatus.CREATED).send({new_party:party})
        } catch (error) {
            catchError(error,response)
            return
        }
    }
}