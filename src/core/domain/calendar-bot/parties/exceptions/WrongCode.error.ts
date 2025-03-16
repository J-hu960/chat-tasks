import { BaseError } from "../../../../domain/error";


export class WrongCodeError extends BaseError{
    constructor(code:string){
        super('wrong-code',`Wrong code: ${code} for party`)
    }

    static withValue(code:string){
        return new WrongCodeError(code);
    }

}