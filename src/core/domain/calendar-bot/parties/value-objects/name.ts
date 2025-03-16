import { InvalidPartyNameError } from "../exceptions/InvalidPartyName.error";

export class PartyName{
    private  constructor(readonly name:string){}


    static create(name:string):PartyName{
        if(!name || name.length > 30 || name.length < 3 ){
            throw InvalidPartyNameError.withValue(name)
        }
        return new PartyName(name);
    }
}