import { Task } from "./task";

export class TaskDTO {
    id: string;
    userId: string;
    title: string;
    description: string;
    date: string;
    duration: number;
    hour: number;
    partyId:string;

    constructor(task: Task) {
        this.id = task.id.value;
        this.userId = task.userId.value;
        this.title = task.title.title;
        this.description = task.description.Description;
        this.date = task.date.getISODate();
        this.duration = task.duration.toMinutes();
        this.hour = task.hour.hour;
        this.partyId = task.party_id.value || '';
    }
}
