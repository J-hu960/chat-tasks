import { BaseError } from "src/core/domain/error";


export class InternalPArsingTaskError extends BaseError{
    constructor(){
        super('internal-error',`error parsing task`)
    }

    static withLength(){
        return new InternalPArsingTaskError();
    }

}