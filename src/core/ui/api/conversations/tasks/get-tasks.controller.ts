import { Controller, Get, HttpStatus, Param, Query, Req, Res, UseGuards } from "@nestjs/common";
import {  Request, Response } from "express";
import { GetTasksQuery } from "src/core/application/conversations/tasks/get-tasks/get-tasks.query";
import { GetTasksQueryHandler } from "src/core/application/conversations/tasks/get-tasks/get-tasks.query-handler";
import { TaskDTO } from "src/core/domain/calendar-bot/tasks/taskResponseDTO";
import { AuthGuard } from "../../auth/nest_authguard";
import { catchError } from "../../error-handler";

@Controller('tasks')
export class GetTasksController {
    constructor(
        private readonly getTasksQueryHandler: GetTasksQueryHandler
    ) {}

    @UseGuards(AuthGuard)
    @Get('/:start/:end')
    async handle(
        @Req() req:Request,
        @Param('start') startDate: string,
        @Param('end') endDate: string,
        @Res() response: Response
    ) {
        try {
            const userId = req['user'].sub
         
            const tasks = await this.getTasksQueryHandler.handle(
                new GetTasksQuery(userId, startDate, endDate)
            );
            const tasksDTO = tasks.map(task => new TaskDTO(task));

             console.log(`tasks for user: ${userId} `)
            response.status(HttpStatus.OK).send({ tasks:tasksDTO });
        } catch (error) {
            catchError(error,response)
            response.status(400).send();
        }
    }
}
