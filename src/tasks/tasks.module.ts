import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Post, PostSchema } from './shema/create-task.schema';
import { CommentsController } from './comments/comments.controller';
import { CommentsService } from './comments/comments.service';
import { Comment, CommentSchema } from './comments/schema/comment.shema';

@Module({
  imports: [MongooseModule.forFeature([
    { name: Post.name, schema: PostSchema },
    { name: Comment.name, schema: CommentSchema }
  ])],
  controllers: [TasksController, CommentsController],
  providers: [TasksService, CommentsService],
  exports: [TasksService, CommentsService]
})
export class TasksModule { }
