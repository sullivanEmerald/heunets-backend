import { Module } from '@nestjs/common';
import { ContributorsController } from './contributors.controller';
import { ContributorsService } from './contributors.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Post, PostSchema } from './shema/create-task.schema';
import { UsersModule } from 'src/users/users.module';
import { User, UserSchema } from 'src/users/schema/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Post.name,
        schema: PostSchema
      },
      { name: User.name, schema: UserSchema },
    ]),

    UsersModule],
  controllers: [ContributorsController],
  providers: [ContributorsService]
})
export class ContributorsModule { }
