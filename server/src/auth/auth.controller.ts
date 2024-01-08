import { SignInDto } from './dtos/signin.dto';
import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dtos/signup.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  async signUp(@Body(new ValidationPipe()) signUpDto: SignUpDto) {
    console.log(signUpDto);
    const res = await this.authService.signUp(signUpDto);
    console.log('res:' + res);
    return res;
  }

  @Post('/signin')
  async signIn(@Body(new ValidationPipe()) signInDto: SignInDto) {
    return await this.authService.signIn(signInDto);
  }

  @Post('/test')
  async test() {
    return 'ok';
  }
}
