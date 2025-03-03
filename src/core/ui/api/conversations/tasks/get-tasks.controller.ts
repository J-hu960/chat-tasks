import { Controller, Get, HttpStatus, Param, Query, Req, Res, UseGuards } from "@nestjs/common";
import { Request, Response } from "express";
import { GetTasksQuery } from "src/core/application/conversations/tasks/get-tasks.query";
import { GetTasksQueryHandler } from "src/core/application/conversations/tasks/get-tasks.query-handler";
import { JwtAuthGuard } from "../../auth/authguard";
import { TaskDTO } from "src/core/domain/conversations/tasks/taskResponseDTO";

@Controller('tasks')
export class GetTasksController {
    constructor(
        private readonly getTasksQueryHandler: GetTasksQueryHandler
    ) {}

    @UseGuards(JwtAuthGuard)
    @Get('/:id/:start/:end')
    handle(
        @Param('id') userId: string,
        @Param('start') startDate: string,
        @Param('end') endDate: string,
        @Res() response: Response
    ) {
        try {
         
            const tasks = this.getTasksQueryHandler.handle(
                new GetTasksQuery(userId, startDate, endDate)
            );
            const tasksDTO = tasks.map(task => new TaskDTO(task));

             console.log(`tasks for user: ${userId} `)
            response.status(HttpStatus.OK).send({ tasks:tasksDTO });
        } catch (error) {
            response.status(400).send();
        }
    }
}
