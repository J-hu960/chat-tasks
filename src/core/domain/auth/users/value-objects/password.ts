

export class UserPassword{
    constructor(
         readonly hashed:string,
    ){}

   async  create(hashed:string){
        return new UserPassword(hashed);
    }



}