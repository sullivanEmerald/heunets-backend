import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
export enum UserRole {
    volunteer = 'volunteer',
    contributor = 'contributor',
}

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User extends Document {
    @Prop({ required: true, unique: true })
    email: string;

    @Prop({ required: true, trim: true })
    fullName: string;

    @Prop({ required: true })
    password: string;

    @Prop({ type: String, enum: UserRole, })
    role: UserRole;

}

export const UserSchema = SchemaFactory.createForClass(User);
UserSchema.index({ email: 1 }, { unique: true });


