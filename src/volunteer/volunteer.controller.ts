import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { VolunteerService } from './volunteer.service';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { CreateCommentDto } from '../tasks/comments/dto/comment.dto';
import { RolesGuard } from 'src/auth/guards/role-guard';
import { UserRole } from 'src/users/schema/user.schema';
import { Roles } from 'src/auth/decorators/role.decorator';

@Controller('volunteer')
@UseGuards(RolesGuard)
@Roles(UserRole.volunteer)
export class VolunteerController {
    constructor(
        private readonly volunteerService: VolunteerService
    ) { }

    @Get('tasks')
    async getAllTasks(@CurrentUser() user: any) {
        return await this.volunteerService.getTasks(user.id)
    }

    @Get('task/:id')
    async getTask(@Param('id') id: string, @CurrentUser() user: any) {
        return await this.volunteerService.getTask(user.id, id)
    }

    @Post('create')
    async(@Body() createCommentDto: CreateCommentDto, @CurrentUser() user: any) {
        return this.volunteerService.createComment(user.id, createCommentDto)
    }
}
