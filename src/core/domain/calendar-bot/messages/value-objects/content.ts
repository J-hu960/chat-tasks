import { InvalidMessageLength } from "../excepcions/InvalidMessageLength.error";

export class MessageContent{
    private constructor(readonly content:string){}

    static create(message:string){
        if(message.length>500||!message){
            throw InvalidMessageLength.withLength(message.length);
        }

        return new MessageContent(message);
    }


}