import { Module } from '@nestjs/common';
import { ResourcesModule } from './resources';
import { CoreModule } from './core';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [...CoreModule, ...ResourcesModule, AuthModule],
})
export class AppModule {}
