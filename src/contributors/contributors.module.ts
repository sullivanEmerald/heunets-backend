import { Module } from '@nestjs/common';
import { ContributorsController } from './contributors.controller';
import { ContributorsService } from './contributors.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Post, PostSchema } from '../tasks/shema/create-task.schema';
import { UsersModule } from 'src/users/users.module';
import { User, UserSchema } from 'src/users/schema/user.schema';
import { Comment, CommentSchema } from 'src/tasks/comments/schema/comment.shema';
import { TasksModule } from 'src/tasks/tasks.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Post.name,
        schema: PostSchema
      },
      { name: User.name, schema: UserSchema },
      { name: Comment.name, schema: CommentSchema }
    ]),
    TasksModule,
    UsersModule],
  controllers: [ContributorsController],
  providers: [ContributorsService],
  exports: [ContributorsService]
})
export class ContributorsModule { }
