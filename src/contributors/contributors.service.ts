import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/createTask.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Post, PostDocument } from './shema/create-task.schema';
import { Model, Types } from 'mongoose';
import { UsersService } from 'src/users/users.service';
import { User, UserDocument } from 'src/users/schema/user.schema';

@Injectable()
export class ContributorsService {
    constructor(
        @InjectModel(Post.name) private taskModel: Model<PostDocument>,
        @InjectModel(User.name) private userModel: Model<UserDocument>
    ) { }

    async createTask(userId: string, createTaskDto: CreateTaskDto) {
        const user = await this.userModel.findById(userId)

        if (!user) {
            throw new NotFoundException('user not found')
        }

        const task = new this.taskModel({
            title: createTaskDto.title,
            description: createTaskDto.description,
            createdBy: new Types.ObjectId(userId)
        })

        return await task.save();
    }

    async getAllTasks(userId: string) {
        const user = await this.userModel.findById(userId);

        if (!user) {
            throw new NotFoundException('User not found');
        }

        const tasks = await this.taskModel.find({ createdBy: new Types.ObjectId(userId) });

        const transformedTasks = tasks.map(task => ({
            id: task._id,
            title: task.title,
            description: task.description,
            createdAt: task.createdAt,
        }));

        return transformedTasks;
    }

    async getTask(userId: string, taskId: string) {
        const user = await this.userModel.findById(new Types.ObjectId(userId))

        if (!user) {
            throw new NotFoundException('user not found')
        }

        const task = await this.taskModel.findById(new Types.ObjectId(taskId))

        if (!task) {
            throw new NotFoundException('Tasks not listed')
        }

        const transformedTask = {
            id: task._id,
            title: task.title,
            description: task.description,
            createdAt: task.createdAt
        }
        return transformedTask;
    }

}
