import { Controller, Get } from "@nestjs/common";



@Controller('version')
export class VersionController{
    constructor(
    ){}

    @Get()
    handle(){
        return {version:"1.1.1"}
    }
}