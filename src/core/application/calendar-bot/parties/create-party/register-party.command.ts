export class RegisterPartyCommand{
    constructor(
        readonly name:string,
        readonly created_by:string,
        readonly code:string
    ){}
}