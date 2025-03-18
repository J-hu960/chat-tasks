import { Controller, Get, HttpStatus, Inject, Req, Res, UseGuards } from "@nestjs/common";
import { AuthGuard } from "../../auth/nest_authguard";
import { GetNewActivityQuery } from "src/core/application/calendar-bot/tasks/get-new-activity-for-user/get-new-activity.query";
import { GetNewActivityQueryHandler } from "src/core/application/calendar-bot/tasks/get-new-activity-for-user/get-new-activity.query-handler";
import { Request, Response } from "express";
import { catchError } from "../../error-handler";
import { Logger, LOGGER_SYMBOL } from "src/core/domain/logger.interface";
import { TaskDTO } from "src/core/domain/calendar-bot/tasks/taskResponseDTO";



@Controller('tasks')
export class GetNewActivityController{
    constructor(
        private readonly getNewActivityQueryHandler:GetNewActivityQueryHandler,
    ){}
    
    @UseGuards(AuthGuard)
    @Get('/activity')
   async  handle(@Req() req:Request, @Res() res:Response){
        try {
            const userId = req['user'].sub

            const tasks = await this.getNewActivityQueryHandler.handle(
                new GetNewActivityQuery(userId)
            );

            const tasksDTO = tasks.map(task => new TaskDTO(task));
            

            res.status(HttpStatus.ACCEPTED).json({tasks:tasksDTO})
        } catch (error) {
            catchError(error,res)
            return
        }
    }

}