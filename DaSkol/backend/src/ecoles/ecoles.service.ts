import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ecole } from './ecole.entity';

@Injectable()
export class EcolesService {
    constructor(
        @InjectRepository(Ecole)
        private ecolesRepository: Repository<Ecole>,
    ) {}
    
    async findAll(): Promise<Ecole[]> {
        return await this.ecolesRepository.find();
    }

    async create(etablissement: string, localisation: string, libelle: string, type: string, niveau_sortie: string, langue_formation: string, site_web: string): Promise<Ecole> {
        const ecole = new Ecole();
        ecole.etablissement = etablissement;
        ecole.localisation = localisation;
        ecole.libelle = libelle;
        ecole.type = type;
        ecole.niveau_sortie = niveau_sortie;
        ecole.langue_formation = langue_formation;
        ecole.site_web = site_web;
        return await this.ecolesRepository.save(ecole);
    }

    async getById(id: number): Promise<Ecole> {
        let ptr= await this.ecolesRepository.findOneBy({id:id});
        if(ptr!=undefined){
            return ptr;
        }
        else{
            return(null);
        }
    }


    async update(id: number, etablissement: string, localisation: string, libelle: string, type: string, niveau_sortie: string, langue_formation: string, site_web: string): Promise<any> {
        const ecole = await this.getById(id);
        if(ecole!=null){
            ecole.etablissement = etablissement;
            ecole.localisation = localisation;
            ecole.libelle = libelle;
            ecole.type = type;
            ecole.niveau_sortie = niveau_sortie;
            ecole.langue_formation = langue_formation;
            ecole.site_web = site_web;
            return await this.ecolesRepository.save(ecole);
        }
        else{
            return(null);
        }
    }

    async delete(id: number): Promise<any> {
        const ecole = await this.getById(id);
        if(ecole!=null){
            return await this.ecolesRepository.remove(ecole);
        }
        else{
            return(null);
        }
    }

    
}
