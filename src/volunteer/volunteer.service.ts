import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { ContributorsService } from 'src/contributors/contributors.service';
import { Post, PostDocument } from 'src/contributors/shema/create-task.schema';
import { User, UserDocument } from 'src/users/schema/user.schema';
import { CreateCommentDto } from './dto/comment.dto';
import { Comment } from './schema/comment.shema';

@Injectable()
export class VolunteerService {
    constructor(
        private readonly contributorService: ContributorsService,
        @InjectModel(User.name) private userModel: Model<UserDocument>,
        @InjectModel(Post.name) private tasksModel: Model<PostDocument>,
        @InjectModel(Comment.name) private commentModel: Model<any>
    ) { }


    async getTasks(userId: string) {
        const user = await this.userModel.findById(new Types.ObjectId(userId))

        if (!user) {
            throw new NotFoundException('user not found')
        }

        const tasks = await this.tasksModel.find().sort({ createdAt: -1 }).lean().exec()

        const transformedTasks = tasks.map(task => ({
            id: task._id,
            title: task.title,
            description: task.description,
            createdAt: task.createdAt,
        }));

        return transformedTasks;

    }

    async createComment(userId: string, commentDto: CreateCommentDto) {
        const id = new Types.ObjectId(userId)

        const user = await this.userModel.findById(id)

        if (!user) {
            throw new NotFoundException('user not found')
        }

        const comment = new this.commentModel({
            taskId: commentDto.taskId,
            message: commentDto.message,
            userId: new Types.ObjectId(userId)
        })

        return await comment.save();

    }
}
