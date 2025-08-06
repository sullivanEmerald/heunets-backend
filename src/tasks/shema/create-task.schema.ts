import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from 'src/users/schema/user.schema';


export type PostDocument = Post & Document;

@Schema({ timestamps: true })
export class Post extends Document {
    @Prop({ required: true })
    title: string;

    @Prop({ required: true })
    description: string;

    @Prop({ type: Types.ObjectId, ref: 'User', required: true })
    createdBy: User;

    @Prop({ default: Date.now() })
    createdAt: Date
}

export const PostSchema = SchemaFactory.createForClass(Post);
