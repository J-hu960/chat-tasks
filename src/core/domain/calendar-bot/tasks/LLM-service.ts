import { Task } from "./task";
import { UserId } from "../../auth/users/value-objects/id";
import { Party } from "../parties/party";

export interface LLMService{
    generateTask(message:string,userId:UserId,UserParties:Party[]):Promise<Task>
}

export const LLMSERVICE = Symbol('llm-service')