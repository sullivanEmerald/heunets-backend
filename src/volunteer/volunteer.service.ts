import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { ContributorsService } from 'src/contributors/contributors.service';
import { Post, PostDocument } from 'src/tasks/shema/create-task.schema';
import { User, UserDocument } from 'src/users/schema/user.schema';
import { CreateCommentDto } from '../tasks/comments/dto/comment.dto';
import { Comment } from '../tasks/comments/schema/comment.shema';
import { TasksService } from 'src/tasks/tasks.service';

@Injectable()
export class VolunteerService {
    constructor(
        private readonly taskService: TasksService,
        @InjectModel(User.name) private userModel: Model<UserDocument>,
        // @InjectModel(Post.name) private tasksModel: Model<PostDocument>,
        // @InjectModel(Comment.name) private commentModel: Model<any>
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

        return await this.taskService.getTask(taskId);

    }

    // async createComment(userId: string, commentDto: CreateCommentDto) {
    //     const id = new Types.ObjectId(userId)

    //     const user = await this.userModel.findById(id)

    //     if (!user) {
    //         throw new NotFoundException('user not found')
    //     }

    //     const comment = new this.commentModel({
    //         taskId: new Types.ObjectId(commentDto.taskId),
    //         message: commentDto.message,
    //         userId: new Types.ObjectId(userId)
    //     })

    //     return await comment.save();

    // }
}
