export class UpdateTaskCommand{
    constructor(
        readonly task_id:string,
        readonly title:string,
        readonly description:string,
        readonly hour:number,
        readonly duration:number,
        readonly user_id:string,
        readonly date:string
    ){}
}