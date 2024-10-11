import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientModule } from './client/client.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Client } from './client/entities/client.entity';

@Module({
  imports: [
    ClientModule,
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: 'mongodb://localhost:27017/your_database_name',
      entities: [Client],
      useUnifiedTopology: true,
    }),
    ClientModule,

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
