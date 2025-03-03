import { BadInputForUser } from "../excepcions/InvalidUserInput.error";

export class Username{
    private constructor( readonly username:string){}

    static create(username:string){
        if(!username || username.length > 25 || username.length < 3){
            throw BadInputForUser.withValue(username)
        }

        return new Username(username)
    }
}