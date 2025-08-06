import { Module } from '@nestjs/common';
import { VolunteerController } from './volunteer.controller';
import { VolunteerService } from './volunteer.service';
import { ContributorsModule } from 'src/contributors/contributors.module';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/users/schema/user.schema';
import { UsersModule } from 'src/users/users.module';
import { Post, PostSchema } from 'src/tasks/shema/create-task.schema';
import { Comment, CommentSchema } from '../tasks/comments/schema/comment.shema';
import { TasksModule } from 'src/tasks/tasks.module';

@Module({
  imports: [ContributorsModule,
    UsersModule,
    TasksModule,
    MongooseModule.forFeature([{
      name: User.name,
      schema: UserSchema
    },
    ])
  ],
  controllers: [VolunteerController],
  providers: [VolunteerService],
  exports: [VolunteerService]
})
export class VolunteerModule { }
