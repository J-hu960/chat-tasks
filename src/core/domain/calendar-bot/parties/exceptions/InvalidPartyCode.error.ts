import { BaseError } from "../../../../domain/error";


export class InvalidPartyCode extends BaseError{
    constructor(code:string){
        super('invalid-code',`Invalid code: ${code}, must be a string of 4 ch`)
    }

    static withValue(code:string){
        return new InvalidPartyCode(code);
    }

}