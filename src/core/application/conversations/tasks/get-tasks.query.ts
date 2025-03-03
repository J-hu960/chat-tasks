export class GetTasksQuery{
    constructor(
        readonly userId:string,
        readonly dateStart:string,
        readonly dateEnd:string


    ){}
}