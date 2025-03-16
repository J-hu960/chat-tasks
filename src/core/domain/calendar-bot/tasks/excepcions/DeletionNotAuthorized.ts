import { BaseError } from "../../../../domain/error";


export class DeletionNotAuthorized extends BaseError{
    constructor(){
        super('unauthorized',`cannot authorize user to do this operation`)
    }

    static create(){
        return new DeletionNotAuthorized();
    }

}