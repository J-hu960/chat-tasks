import { Body, Controller, Delete, HttpStatus, Req, Res, UseGuards } from "@nestjs/common";
import { Request, Response } from "express";
import { DeleteTaskCommand } from "src/core/application/calendar-bot/tasks/delete/delete-task.command";
import { DeleteTaskCommandHandler } from "src/core/application/calendar-bot/tasks/delete/delete-task.command-handler";
import { catchError } from "../../error-handler";
import { AuthGuard } from "../../auth/nest_authguard";

@Controller('tasks_delete')
export class DeleteTaskController{
    constructor(
        private readonly deleteTaskCommandHandler:DeleteTaskCommandHandler
    ){}
    
    @UseGuards(AuthGuard)
    @Delete()
   async handle(@Req() request:Request,@Body() deleteTaskCommand:DeleteTaskCommand, @Res() response:Response){
        try {
            console.log(deleteTaskCommand.task_id)
            await this.deleteTaskCommandHandler.handle(
                deleteTaskCommand, request['user'].sub
            );

            response.status(HttpStatus.ACCEPTED).send({message:'Task deleted successfully'});
            
        } catch (error) {
            console.log(error)
            catchError(error,response);
            return  
        }
    }
}