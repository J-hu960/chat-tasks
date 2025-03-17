import { Inject, Injectable } from "@nestjs/common";
import { RetrieveUserPartiesQuery } from "./retrieve-userParties.query";
import { PARTY_REPOSITORY, PartyRepository } from "src/core/domain/calendar-bot/parties/party.repository";

@Injectable()
export class RetrieveUserPartiesQueryHandler{
    constructor(
        @Inject(PARTY_REPOSITORY) private readonly partyRepository:PartyRepository,
    ){}

    async handle(query:RetrieveUserPartiesQuery){

        const user_parties = await this.partyRepository.getAllPartiesForUser(query.user_id)
       return user_parties;

    }
}