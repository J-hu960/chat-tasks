import { BaseError } from "../../../../domain/error";

const min = 0;
const max = 200;
export class InvalidMessageLength extends BaseError{
    constructor(len:number){
        super('invalid-length',`Invalid message length: ${len}, must be between: ${min} and ${max}`)
    }

    static withLength(len:number){
        return new InvalidMessageLength(len);
    }

}