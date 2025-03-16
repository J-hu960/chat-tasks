export class JoinPartyCommand{
    constructor(
        readonly user_id:string,
        readonly party_name:string,
        readonly code:string
    ){}
}