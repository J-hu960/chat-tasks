import { PARTY_REPOSITORY, PartyRepository } from "src/core/domain/calendar-bot/parties/party.repository";
import { RegisterPartyCommand } from "./register-party.command";
import { RepeatedPartyname } from "src/core/domain/calendar-bot/parties/exceptions/RepeatedPartyCode.error";
import { Party } from "src/core/domain/calendar-bot/parties/party";
import { UserId } from "src/core/domain/auth/users/value-objects/id";
import { LimititPartiesForUser } from "src/core/domain/calendar-bot/parties/exceptions/LimitPartiesForUser.error";
import { Inject, Injectable } from "@nestjs/common";

@Injectable()
export class  RegisterPartyCommanHandler{
    constructor(
        @Inject(PARTY_REPOSITORY) private readonly partyRepository:PartyRepository
    ){}

    async handle(command:RegisterPartyCommand){
       
        if(await(this.partyRepository.partiesCreatedByUser(command.created_by)) >= 20){
            throw LimititPartiesForUser.withValue(command.created_by);
        };

        if(await( this.partyRepository.existsWithName(command.name))){
            throw RepeatedPartyname.withValue(command.name)
        };


        console.log(`Creating party with name: ${command.name}`)
        const created_by = UserId.fromExisting(command.created_by)

        const party = Party.create(command.name, command.code,created_by,[created_by]);

        this.partyRepository.save(party)

         
        return party;
    }
}