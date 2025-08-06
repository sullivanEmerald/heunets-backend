import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Comment } from './schema/comment.shema';
import { Model, Types } from 'mongoose';
import { CreateCommentDto } from './dto/comment.dto';

@Injectable()
export class CommentsService {
    constructor(
        @InjectModel(Comment.name) private commentModel: Model<any>
    ) { }

    async postComment(userId: string, createCommentDto: CreateCommentDto) {

        const comment = new this.commentModel({
            taskId: new Types.ObjectId(createCommentDto.taskId),
            message: createCommentDto.message,
            userId: new Types.ObjectId(userId)
        })

        return await comment.save();
    }
}
