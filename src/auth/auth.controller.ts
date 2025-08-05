import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { Public } from './decorators/public.decotator';
import { CurrentUser } from './decorators/current-user.decorator';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
    ) { }

    @Public()
    @Post('register')
    async register(@Body() createUserDto: CreateUserDto) {
        console.log('Registering user:', createUserDto)
        return this.authService.register(createUserDto);
    }

    @Public()
    @Post('login')
    async Login(@Body() loginUserDto: { email: string, password: string }) {
        const user = await this.authService.validateUser(loginUserDto.email, loginUserDto.password)

        return await this.authService.Login(user)

    }

    @Get('me')
    async Profile(@CurrentUser() user: any) {
        return this.authService.getProfile(user.id)
    }
}
