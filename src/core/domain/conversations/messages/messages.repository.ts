import { Id } from "../../id";
import { Message } from "./message.entity";

export interface MessagesRepository{
    save(message:Message):void;
    exists(id:string):boolean;
    getMessages();
}

export const MESSAGE_REPOSITORY = Symbol("message-repository")