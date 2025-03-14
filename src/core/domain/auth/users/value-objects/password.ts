

export class UserPassword{
    constructor(
         readonly hashed:string,
    ){}

   static  create(hashed:string){
       
        return new UserPassword(hashed);
    }
    static fromExisting(hashed:string){
        return new UserPassword(hashed)
    }


}