import { SignUpDto } from './dtos/signup.dto';
import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare, hash } from 'bcrypt';
import { PostgresService } from 'src/postgres/postgres.service';
import { SignInDto } from './dtos/signin.dto';

@Injectable()
export class AuthService {
  constructor(
    private postgresService: PostgresService,
    private jwtService: JwtService,
  ) {}

  async signUp(signUpDto: SignUpDto) {
    const { email, password, name, image } = signUpDto;
    const user = await this.findUser(email);
    if (user) throw new ConflictException('user existed');
    const newUser = await this.postgresService.user.create({
      data: {
        email: email,
        password: await hash(password, 10),
        name: name,
        image: image,
      },
    });
    return newUser;
  }

  async signIn(signInDto: SignInDto) {
    const { email, password } = signInDto;
    const user = await this.findUser(email);
    if (!user || !(await compare(password, user.password))) {
      throw new UnauthorizedException();
    }
    const payload = {
      sub: {
        email: user.email,
      },
    };

    return {
      user,
      token: {
        accessToken: await this.jwtService.signAsync(payload, {
          expiresIn: '1h',
          secret: process.env.JWT_KEY,
        }),
        refreshToken: await this.jwtService.signAsync(payload, {
          expiresIn: '7d',
          secret: process.env.JWT_KEY,
        }),
      },
    };
  }

  private async findUser(email: string) {
    const user = await this.postgresService.user.findUnique({
      where: { email: email },
    });
    return user;
  }
}
