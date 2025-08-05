import { IsNotEmpty, IsString, IsMongoId } from 'class-validator';

export class CreateCommentDto {
    @IsMongoId()
    @IsNotEmpty()
    taskId: string;

    @IsString()
    @IsNotEmpty()
    message: string;
}
