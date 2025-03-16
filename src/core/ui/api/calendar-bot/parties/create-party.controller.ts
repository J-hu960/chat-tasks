import { Body, Controller, HttpStatus, Post, Req, Res, UseGuards } from "@nestjs/common";
import { Response,Request } from "express";
import { catchError } from "../../error-handler";
import { AuthGuard } from "../../auth/nest_authguard";
import { RegisterPartyCommanHandler } from "src/core/application/calendar-bot/parties/create-party/register-party.command-handler";
import { RegisterPartyCommand } from "src/core/application/calendar-bot/parties/create-party/register-party.command";


class RegisterPartyDTO{
    readonly name:string;
    readonly code:string;
}

@Controller('parties')
export class RegisterPartyController{
    constructor(
        private readonly registerpartyCommandHandler:RegisterPartyCommanHandler
    ){}

    @UseGuards(AuthGuard)
    @Post()
   async handle(      
        @Req() request: Request,
        @Body() registerPartyDTO:RegisterPartyDTO,
        @Res() response:Response){
        try {
            const created_by = (request['user'])
            const party = await this.registerpartyCommandHandler.handle(
                new RegisterPartyCommand(registerPartyDTO.name,created_by,registerPartyDTO.code)
            );

            response.status(HttpStatus.CREATED).send({new_party:party})
        } catch (error) {
            catchError(error,response)
            return
        }
    }
}