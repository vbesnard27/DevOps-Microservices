import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EcolesModule } from './ecoles/ecoles.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ecole } from './ecoles/ecole.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'mydatabase.db',
      entities: [Ecole],
      synchronize: true,
    }),
    EcolesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
