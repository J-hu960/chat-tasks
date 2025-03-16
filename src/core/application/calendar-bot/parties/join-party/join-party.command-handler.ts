import { PARTY_REPOSITORY, PartyRepository } from "src/core/domain/calendar-bot/parties/party.repository";
import { JoinPartyCommand } from "./join-party.command";
import { NonExistingPartyName } from "src/core/domain/calendar-bot/parties/exceptions/NonExistingPartyName.error";
import { WrongCodeError } from "src/core/domain/calendar-bot/parties/exceptions/WrongCode.error";
import { Inject, Injectable } from "@nestjs/common";

@Injectable()
export class JoinPartyCommandHandler{
    constructor(
       @Inject(PARTY_REPOSITORY) private readonly partiesRepository:PartyRepository
    ){}

    async handle(command:JoinPartyCommand){
        // en mongo, gestionamos un set, realmente no haria falta hacer un check de si ya está en la lista (no tendremos duplicados).

       const party = await this.partiesRepository.findByName(command.party_name);
       if(!party){
        throw NonExistingPartyName.withValue(command.party_name);
       };

       if(party.code.code !== command.code){
          throw WrongCodeError.withValue(command.code)   
       };

      this.partiesRepository.join(command.user_id,command.party_name)

    }
}