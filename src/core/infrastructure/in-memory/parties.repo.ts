import { UserId } from "src/core/domain/auth/users/value-objects/id";
import { Party } from "src/core/domain/calendar-bot/parties/party";
import { PartyRepository } from "src/core/domain/calendar-bot/parties/party.repository";

export class PartyRepositoryInMemory implements PartyRepository{
    readonly parties:Party[] = [];
    constructor(){}

    async existsWithName(name: string): Promise<boolean> {
        console.log(this.parties)
        return this.parties.some(party=>party.name.name === name)
    }

    async partiesCreatedByUser(user_id: string): Promise<number> {
        let sum = 0;
        for(let i = 0; i < this.parties.length; i++){
            if(this.parties[i].created_by.value === user_id){
                sum++
            }
        }

        return sum
    }

    save(party: Party): void {
        this.parties.push(party)
    }

    join(user_id: any,party_id:string): void {
        for(let i = 0; i < this.parties.length; i++){
            if(this.parties[i].id.value === party_id){
                this.parties[i].users_id.push(UserId.fromExisting(user_id));
            };
        };
    }

   async  findByName(party_name: string): Promise<Party> {
        for(let i = 0; i < this.parties.length; i++){
            if(this.parties[i].name.name === party_name){
                return this.parties[i]
            };
        };
        
    }

    


}