import {  Controller, Get, HttpStatus, Req, Res, UseGuards } from "@nestjs/common";
import { Response,Request } from "express";
import { catchError } from "../../error-handler";
import { AuthGuard } from "../../auth/nest_authguard";
import { RetrieveUserPartiesQuery } from "src/core/application/calendar-bot/parties/retrieve-userParties/retrieve-userParties.query";
import { RetrieveUserPartiesQueryHandler } from "src/core/application/calendar-bot/parties/retrieve-userParties/retrieve-userParties.query-handler";

class PartiesResponseDTO{
    constructor(
        readonly id:string,
        readonly name:string,
        readonly code:string,
        readonly created_by:string,
        readonly users_ids:string[],
        readonly created_at:Date

    ){}
    
}

@Controller('parties')
export class RetrieveUserPartiesController{
    constructor(
        private readonly retrieveUserPartiesQueryHandler:RetrieveUserPartiesQueryHandler
    ){}

    @UseGuards(AuthGuard)
    @Get()
   async handle(      
        @Req() request: Request,
        @Res() response:Response){
        try {
            const user_id = (request['user'].sub)
            const user_parties = await this.retrieveUserPartiesQueryHandler.handle(
                new RetrieveUserPartiesQuery(user_id)
            );

            const response_values = user_parties.map(party=>{
                const user_ids = party.users_id.map(id=>id.value)
                return new PartiesResponseDTO(party.id.value,party.name.name,party.code.code,party.created_by.value,user_ids,party.created_at)
            })

            response.status(HttpStatus.CREATED).send({parties:response_values})
        } catch (error) {
            catchError(error,response)
            return
        }
    }
}