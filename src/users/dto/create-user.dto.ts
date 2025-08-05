import { IsEmail, IsNotEmpty, IsString, MinLength, IsEnum, IsOptional } from 'class-validator';
export class CreateUserDto {
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    fullName: string;

    @IsString()
    password: string;

    @IsEnum(['volunteer', 'contributor'])
    @IsString()
    role: 'volunteer' | 'contributor';

}