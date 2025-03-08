import { BaseError } from "src/core/domain/error";


export class NonExistingUserError extends BaseError{
    constructor(email:string){
        super('non-existing user',`user with email:${email}} does not exist`)
    }

    static withValue(email:string){
        return new NonExistingUserError(email);
    }

}