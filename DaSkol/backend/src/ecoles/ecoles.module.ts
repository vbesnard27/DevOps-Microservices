import { Module } from '@nestjs/common';
import { EcolesController } from './ecoles.controller';
import { EcolesService } from './ecoles.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ecole } from './ecole.entity';

@Module({
  imports: [ TypeOrmModule.forFeature([Ecole]) ],
  controllers: [EcolesController],
  providers: [EcolesService]
})
export class EcolesModule {}
