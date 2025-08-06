import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Comment extends Document {
    @Prop({ type: Types.ObjectId, ref: 'Post', required: true })
    taskId: Types.ObjectId;

    @Prop({ type: Types.ObjectId, ref: 'User', required: true })
    userId: Types.ObjectId;

    @Prop({ required: true })
    message: string;

    @Prop({ default: Date.now })
    appliedDate: Date;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
