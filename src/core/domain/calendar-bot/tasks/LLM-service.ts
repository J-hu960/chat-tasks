import { symbol } from "zod";
import { MessageContent } from "../messages/value-objects/content";
import { Task } from "./task";
import { UserId } from "../../auth/users/value-objects/id";

export interface LLMService{
    generateTask(message:string,userId:UserId):Promise<Task>
}

export const LLMSERVICE = Symbol('llm-service')