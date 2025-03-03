export class RegisterUserCommand{
    constructor(
        readonly username:string,
        readonly mail:string,
        readonly password:string,
        readonly repeatedPassord:string

    ){}
}