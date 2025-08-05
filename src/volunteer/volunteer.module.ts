import { Module } from '@nestjs/common';
import { VolunteerController } from './volunteer.controller';
import { VolunteerService } from './volunteer.service';
import { ContributorsModule } from 'src/contributors/contributors.module';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/users/schema/user.schema';
import { UsersModule } from 'src/users/users.module';
import { Post, PostSchema } from 'src/contributors/shema/create-task.schema';
import { Comment, CommentSchema } from './schema/comment.shema';

@Module({
  imports: [ContributorsModule,
    UsersModule,
    MongooseModule.forFeature([{
      name: User.name,
      schema: UserSchema
    },
    {
      name: Post.name,
      schema: PostSchema
    },
    {
      name: Comment.name,
      schema: CommentSchema
    },
    ])
  ],
  controllers: [VolunteerController],
  providers: [VolunteerService],
  exports: [VolunteerService]
})
export class VolunteerModule { }
