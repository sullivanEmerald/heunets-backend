import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { User, UserDocument } from './schema/user.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';


@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>
    ) { }

    async findUserByEmail(email: string): Promise<UserDocument> {
        return await this.userModel.findOne({ email })
    }

    async createUser(createUserDto: CreateUserDto): Promise<UserDocument> {

        console.log(CreateUserDto)

        const { email, fullName, password, role } = createUserDto

        const hashedPassoword = await bcrypt.hash(password, 10)

        const user = new this.userModel({
            fullName: fullName,
            email: email,
            password: hashedPassoword,
            role: role
        })

        return await user.save();
    }

    async getUser(userId: string) {
        const user = await this.userModel.findById(userId)

        if (!user) {
            throw new NotFoundException('user was not found')
        }


        return user.toObject();
    }
}
