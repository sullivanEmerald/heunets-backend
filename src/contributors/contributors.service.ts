import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from '../tasks/dto/createTask.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Post, PostDocument } from '../tasks/shema/create-task.schema';
import { Model, Types } from 'mongoose';
import { UsersService } from 'src/users/users.service';
import { User, UserDocument } from 'src/users/schema/user.schema';
import { Comment } from 'src/tasks/comments/schema/comment.shema';
import { TasksService } from 'src/tasks/tasks.service';

@Injectable()
export class ContributorsService {
    constructor(
        @InjectModel(Post.name) private taskModel: Model<PostDocument>,
        @InjectModel(Comment.name) private CommentModel: Model<any>,
        @InjectModel(User.name) private userModel: Model<UserDocument>,
        private readonly tasksService: TasksService,
    ) { }

    async createTask(userId: string, createTaskDto: CreateTaskDto) {
        const user = await this.userModel.findById(userId)

        if (!user) {
            throw new NotFoundException('user not found')
        }

        return await this.tasksService.createTask(userId, createTaskDto)

    }

    async getAllTasks(userId: string) {
        const user = await this.userModel.findById(userId);

        if (!user) {
            throw new NotFoundException('User not found');
        }

        return await this.tasksService.getAllTasksByUser(userId)
    }

    async getTask(userId: string, taskId: string) {
        const user = await this.userModel.findById(new Types.ObjectId(userId))

        if (!user) {
            throw new NotFoundException('user not found')
        }

        return await this.tasksService.getTaskAndAppplications(taskId)

    }

}
