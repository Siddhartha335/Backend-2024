import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PropertyModule } from './property/property.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PgConfig } from 'db.config';

@Module({
  imports: [PropertyModule, TypeOrmModule.forRoot(PgConfig)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
