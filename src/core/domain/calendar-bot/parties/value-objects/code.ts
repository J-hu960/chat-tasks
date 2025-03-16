import { InvalidPartyCode } from "../exceptions/InvalidPartyCode.error";

export class PartyCode{
    private constructor(readonly code:string){}

    static withValue(code:string){
        if(code.trim().length !== 4){
            throw InvalidPartyCode.withValue(code);
        }
        return new PartyCode(code.trim());
    }
}