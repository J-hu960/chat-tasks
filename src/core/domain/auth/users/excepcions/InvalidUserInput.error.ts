import { BaseError } from "src/core/domain/error";


export class BadInputForUser extends BaseError{
    constructor(val:any){
        super('invalid-input',`Invalid User input:${val}}`)
    }

    static withValue(val:any){
        return new BadInputForUser(val);
    }

}