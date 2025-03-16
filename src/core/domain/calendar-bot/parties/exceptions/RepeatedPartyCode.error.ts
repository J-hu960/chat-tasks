import { BaseError } from "../../../../domain/error";


export class RepeatedPartyname extends BaseError{
    constructor(name:string){
        super('invalid-name',`Invalid name: ${name}, already exists`)
    }

    static withValue(name:string){
        return new RepeatedPartyname(name);
    }

}