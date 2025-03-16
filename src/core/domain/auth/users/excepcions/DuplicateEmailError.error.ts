import { BaseError } from "src/core/domain/error";


export class DuplicateMailError extends BaseError{
    constructor(email:string){
        super('duplicate-email',`email: ${email} already exists, try with another one please.`)
        this.name = "dplicate-email"
    }

    static withLength(email:string){
        return new DuplicateMailError(email);
    }

}
// src/core/domain/auth/users/exceptions/DuplicateMailError.ts

