import { BaseError } from "src/core/domain/error";


export class BadInputForTask extends BaseError{
    constructor(val:any){
        super('invalid-input',`Invalid task input:${val}}`)
    }

    static withValue(val:any){
        return new BadInputForTask(val);
    }

}