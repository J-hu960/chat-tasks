import { Body, Controller, Delete, HttpStatus, Put, Req, Res, UseGuards } from "@nestjs/common";
import { Request, Response } from "express";
import { DeleteTaskCommand } from "src/core/application/conversations/tasks/delete/delete-task.command";
import { DeleteTaskCommandHandler } from "src/core/application/conversations/tasks/delete/delete-task.command-handler";
import { catchError } from "../../error-handler";
import { AuthGuard } from "../../auth/nest_authguard";
import { UpdateTaskCommandHandler } from "src/core/application/conversations/tasks/update-task/update-task.command-handler";
import { UpdateTaskCommand } from "src/core/application/conversations/tasks/update-task/update-task.command";

@Controller('tasks_update')
export class UpdateTaskController{
    constructor(
        private readonly updateTaskCommandHandler:UpdateTaskCommandHandler
    ){}
    
    @UseGuards(AuthGuard)
    @Put()
    handle(@Req() request:Request,@Body() updateTaskCommand:UpdateTaskCommand, @Res() response:Response){
        console.log(updateTaskCommand.task_id)
        try {
            this.updateTaskCommandHandler.handle(
                updateTaskCommand
            )

            response.status(HttpStatus.ACCEPTED).send({message:'Task updated successfully'})
            
        } catch (error) {
            console.log(error)
            catchError(error,response)
            return  
        }
    }
}