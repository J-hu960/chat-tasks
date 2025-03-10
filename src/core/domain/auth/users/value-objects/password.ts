

export class UserPassword{
    constructor(
         readonly hashed:string,
    ){}

   static  create(plain:string){
        const hashed = plain //TODO: HASH HEREEEE
        return new UserPassword(hashed);
    }
    static fromExisting(hashed:string){
        return new UserPassword(hashed)
    }


}