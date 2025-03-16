import { BaseError } from "../../../../domain/error";


export class InvalidPartyNameError extends BaseError{
    constructor(name:string){
        super('invalid-name',`Invalid name: ${name}, must be a string between 3-30 ch`)
    }

    static withValue(name:string){
        return new InvalidPartyNameError(name);
    }

}