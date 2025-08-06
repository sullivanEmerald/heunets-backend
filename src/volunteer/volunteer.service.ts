import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { User, UserDocument } from 'src/users/schema/user.schema';
import { CreateCommentDto } from '../tasks/comments/dto/comment.dto';
import { TasksService } from 'src/tasks/tasks.service';
import { CommentsService } from 'src/tasks/comments/comments.service';

@Injectable()
export class VolunteerService {
    constructor(
        private readonly taskService: TasksService,
        @InjectModel(User.name) private userModel: Model<UserDocument>,
        private readonly commentService: CommentsService
    ) { }


    async getTasks(userId: string) {
        const user = await this.userModel.findById(new Types.ObjectId(userId))

        if (!user) {
            throw new NotFoundException('user not found')
        }

        return await this.taskService.getAllTask();

    }

    async getTask(userId: string, taskId: string) {
        const user = await this.userModel.findById(new Types.ObjectId(userId))

        if (!user) {
            throw new NotFoundException('user not found')
        }

        return await this.taskService.getTask(userId, taskId);

    }

    async createComment(userId: string, createCommentDto: CreateCommentDto) {
        const id = new Types.ObjectId(userId)

        const user = await this.userModel.findById(id)

        if (!user) {
            throw new NotFoundException('user not found')
        }

        return await this.commentService.postComment(userId, createCommentDto)

    }
}
