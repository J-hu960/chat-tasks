import { InjectModel } from "@nestjs/mongoose";

import { Party } from "src/core/domain/calendar-bot/parties/party";
import { PartyRepository } from "src/core/domain/calendar-bot/parties/party.repository";
import { PartyDocument, PartyModel } from "./schema";
import { Model } from "mongoose";
import { Injectable } from "@nestjs/common";
import { UserId } from "src/core/domain/auth/users/value-objects/id";

@Injectable()
export class PartyMongoRepository implements PartyRepository{
  constructor(@InjectModel(PartyModel.name) private partyModel: Model<PartyModel>) {}

    async existsWithName(name: string): Promise<boolean> {
        const party = await this.partyModel.findOne({ name:name }).exec();
        return !!party;

    }

    async partiesCreatedByUser(user_id: string): Promise<number> {
        return this.partyModel.countDocuments({ created_by: user_id }).exec();
    }

    async save(party:Party){
        const newParty =  new this.partyModel({
            id:party.id.value,
            name:party.name.name,
            created_by:party.created_by.value,
            users_ids:party.users_id,
            created_at:party.created_at,
            code:party.code.code,
            last_modified:party.created_at
        })

        await newParty.save()
    }

    async join(user_id: string, party_name: string): Promise<void> {
         await this.partyModel.updateOne(
              { name: party_name },
              { $addToSet: { users_ids: user_id } }
            ).exec();
          }

   async findByName(party_name: string): Promise<Party> {
        const party = await this.partyModel.findOne({name:party_name}).exec()
        return this.toDomainObject(party)
    
    }


    async getAllPartiesForUser(user_id: string): Promise<Party[]> {
      const parties = await  this.partyModel.find({
        $or: [{ created_by: user_id }, { users_ids: { $in: [user_id] } }]
      }).exec();

      const domainParties = parties.map(party=> this.toDomainObject(party))

      return domainParties
    }
    

    private toDomainObject(mongoParty:PartyDocument):Party{
      const created_by = UserId.fromExisting(mongoParty.created_by)
      const users_ids = mongoParty.users_ids.map(id => UserId.fromExisting(id))
      const party = Party.fromExisting(mongoParty.id,mongoParty.name,mongoParty.code,created_by,users_ids,mongoParty.created_at)

      return party

    }

    async getUsersFromParty(party_id: any): Promise<string[]> {
      const party = await  this.partyModel.findOne({id:party_id }).exec();
      console.log(`user ids for party are: ${party.users_ids}`)
      return party.users_ids;
    }


        
}

    