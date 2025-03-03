import { BadInputForUser } from "../excepcions/InvalidUserInput.error";

export class UserMail {
    private constructor(
         readonly email:string
    ){}

    static create(email:string){
       const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
       if(!(emailRegex.test(email))){
             throw BadInputForUser.withValue(email);
       }

       return new UserMail(email);

    }


}