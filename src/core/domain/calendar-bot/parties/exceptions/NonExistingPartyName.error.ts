import { BaseError } from "../../../../domain/error";


export class NonExistingPartyName extends BaseError{
    constructor(party_name:string){
        super('not-found',` party: ${party_name} not found`)
    }

    static withValue(party_name:string){
        return new NonExistingPartyName(party_name);
    }

}