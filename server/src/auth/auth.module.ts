import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
// import { JwtModule } from '@nestjs/jwt';
import { PostgresService } from 'src/postgres/postgres.service';
import { JwtService } from '@nestjs/jwt';
@Module({
  imports: [
    // JwtModule.register({
    //   global: true,
    //   secret: 'secret',
    //   signOptions: { expiresIn: '60s' },
    // }),
  ],
  controllers: [AuthController],
  providers: [AuthService, PostgresService, JwtService],
})
export class AuthModule {}
