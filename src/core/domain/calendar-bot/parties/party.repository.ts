import { Party } from "./party";

export interface PartyRepository{
    existsWithName(name:string):Promise<boolean>;
    partiesCreatedByUser(user_id:string):Promise<number>;
    save(party:Party):void;
    join(user_id:string,party_name:string):void;
    findByName(party_name:string):Promise<Party>
}

export const PARTY_REPOSITORY = Symbol('party-repository')