export class DeleteTaskCommand{
    constructor(
        readonly user_id:string,
        readonly task_id:string
    ){}
}