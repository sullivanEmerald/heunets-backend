import { Controller, Post, Body, Get, Param, UseGuards } from '@nestjs/common';
import { ContributorsService } from './contributors.service';
import { CreateTaskDto } from '../tasks/dto/createTask.dto';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { RolesGuard } from 'src/auth/guards/role-guard';
import { UserRole } from 'src/users/schema/user.schema';
import { Roles } from 'src/auth/decorators/role.decorator';

@Controller('contributors')
@UseGuards(RolesGuard)
@Roles(UserRole.contributor)
export class ContributorsController {
    constructor(
        private readonly contributorService: ContributorsService
    ) { }

    @Post('create')
    async CreateTask(@Body() createTaskDto: CreateTaskDto, @CurrentUser() user: any) {
        return await this.contributorService.createTask(user.id, createTaskDto)
    }

    @Get('tasks')
    async getAllTasks(@CurrentUser() user: any) {
        return await this.contributorService.getAllTasks(user.id)
    }

    @Get('task/:id')
    async getTask(@Param('id') id: string, @CurrentUser() user: any) {
        return await this.contributorService.getTask(user.id, id)
    }
}
