import { BaseError } from "../../../../domain/error";


export class LimititPartiesForUser extends BaseError{
    constructor(user_id:string){
        super('parties-limit',`maximum number of parties created (20) by user ${user_id}`)
    }

    static withValue(user_id:string){
        return new LimititPartiesForUser(user_id);
    }

}