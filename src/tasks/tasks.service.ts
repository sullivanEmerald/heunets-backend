import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Post } from './shema/create-task.schema';
import { Model, Types } from 'mongoose';
import { CreateTaskDto } from './dto/createTask.dto';
import { Comment } from './comments/schema/comment.shema';

@Injectable()
export class TasksService {
    constructor(
        @InjectModel(Post.name) private taskModel: Model<any>,
        @InjectModel(Comment.name) private commentModel: Model<any>
    ) { }

    async createTask(userId: string, createTaskDto: CreateTaskDto) {

        const task = new this.taskModel({
            title: createTaskDto.title,
            description: createTaskDto.description,
            createdBy: new Types.ObjectId(userId)
        })

        return await task.save();
    }

    async getAllTasksByUser(userId: string) {

        const tasks = await this.taskModel.find({ createdBy: new Types.ObjectId(userId) }).sort({ createdAt: -1 });

        const transformedTasks = tasks.map(task => ({
            id: task._id,
            title: task.title,
            description: task.description,
            createdAt: task.createdAt,
        }));

        return transformedTasks;
    }

    async getTaskAndAppplications(taskId: string) {

        const [task, comments] = await Promise.all([
            this.taskModel.findById(new Types.ObjectId(taskId)),
            this.commentModel.find({ taskId: new Types.ObjectId(taskId) }).populate('userId', 'fullName')
        ])

        if (!task) {
            throw new NotFoundException('Tasks not listed')
        }

        const transformedTask = {
            id: task._id,
            title: task.title,
            description: task.description,
            createdAt: task.createdAt
        }

        return {
            transformedTask,
            comments
        };
    }

    async getAllTask() {
        const tasks = await this.taskModel.find().sort({ createdAt: -1 }).lean().exec()

        const transformedTasks = tasks.map(task => ({
            id: task._id,
            title: task.title,
            description: task.description,
            createdAt: task.createdAt,
        }));

        return transformedTasks;
    }

    async getTask(userId: string, taskId: string) {
        const [task, isUserApplied] = await Promise.all([
            this.taskModel.findById(new Types.ObjectId(taskId)).lean(),
            this.commentModel.findOne({
                userId: new Types.ObjectId(userId),
                taskId: new Types.ObjectId(taskId),
            }).lean(),
        ]);

        return {
            task,
            hasUserCommented: !!isUserApplied,
        };
    }

}
