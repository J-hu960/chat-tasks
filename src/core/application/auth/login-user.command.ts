export class LoginUserCommand{
    constructor(
        readonly mail:string,
        readonly password:string,
    ){}
}