import { Task } from "./task";

export interface Calendar {
    addEventToCalendar(task: Task,access_token:string,refresh_token:string): Promise<void>;
    refreshAccessTokenIfNeeded(access_token: string,refresh_token:string): Promise<string>;
  }
  