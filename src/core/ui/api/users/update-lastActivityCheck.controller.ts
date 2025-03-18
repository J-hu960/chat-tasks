import { Controller, HttpStatus, Put, Req, Res, UseGuards } from "@nestjs/common";
import { Request, Response } from "express";
import { UpdateLastActivityCheckCommandHandler } from "src/core/application/users/update-lastCheck/update-lastActivityCheck.command-handler";
import { AuthGuard } from "../auth/nest_authguard";
import { UpdateLastActivityCheckCommand } from "src/core/application/users/update-lastCheck/update-lastActivityCheck.command";
import { catchError } from "../error-handler";


@Controller('users')
export class UpdateLastActivityCheckController{
    constructor(
        private readonly updateLastActivityCheckCommandHandler:UpdateLastActivityCheckCommandHandler
    ){}
    @UseGuards(AuthGuard)
    @Put()
    async handle(@Req() req:Request,@Res() response:Response){
        try {
            const userId = req['user'].sub;
            await this.updateLastActivityCheckCommandHandler.handle(
                new UpdateLastActivityCheckCommand(userId)
            );

            response.status(HttpStatus.ACCEPTED).json({message:'User updated to the new date'})
            
        } catch (error) {
            catchError(error,response);
            return
        }
    }


}