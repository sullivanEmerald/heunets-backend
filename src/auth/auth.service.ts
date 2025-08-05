import { BadRequestException, ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { access } from 'fs';


@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private jwtService: JwtService
    ) { }
    async register(createUserDto: CreateUserDto) {

        const userExists = await this.usersService.findUserByEmail(createUserDto.email);

        if (userExists) {
            throw new ConflictException('Email already exits. Try a new email')
        }

        const user = await this.usersService.createUser(createUserDto)
        console.log('Registered user:', user);
        return { message: 'User registered successfully', ...user };
    }

    async validateUser(email: string, password: string) {

        const user = await this.usersService.findUserByEmail(email)

        if (!user) {
            throw new UnauthorizedException('Email is not associated with any account')
        }

        const isPasswordValid = await bcrypt.compare(password, user.password)

        if (!isPasswordValid) {
            throw new ConflictException("Invalid credentials")
        }

        return user;
    }

    async Login(user: any) {

        const payload = {
            email: user.email,
            sub: user._id,
            role: user.role
        }

        return {
            access_token: this.jwtService.sign(payload)
        }
    }
}
