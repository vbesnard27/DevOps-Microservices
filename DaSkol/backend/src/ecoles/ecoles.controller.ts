import { Controller, Get, Body, Post, Param, Delete, Put } from '@nestjs/common';
import { EcolesService } from './ecoles.service';
import { Ecole } from './ecole.entity';

@Controller('ecoles')
export class EcolesController {
    constructor(
        private  ecolesService: EcolesService,
    ){}

    @Get()
    async findAll(): Promise<Ecole[]> {
        return this.ecolesService.findAll();
    }

    @Post()
    async create(@Body() ecole: Ecole): Promise<Ecole> {
        return this.ecolesService.create(ecole.etablissement, ecole.localisation, ecole.libelle, ecole.type, ecole.niveau_sortie, ecole.langue_formation, ecole.site_web);
    }

    @Get(':id')
    async getById(@Param('id') id: number): Promise<Ecole> {
        return this.ecolesService.getById(id);
    }

    @Put(':id')
    async update(@Param('id') id: number, @Body() ecole: Ecole): Promise<any> {
        return this.ecolesService.update(id, ecole.etablissement, ecole.localisation, ecole.libelle, ecole.type, ecole.niveau_sortie, ecole.langue_formation, ecole.site_web);
    }

    @Delete(':id')
    async delete(@Param('id') id: number): Promise<any> {
        return this.ecolesService.delete(id);
    }
}
