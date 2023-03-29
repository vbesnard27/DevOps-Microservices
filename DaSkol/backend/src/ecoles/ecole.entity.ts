import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Ecole {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    etablissement: string;

    @Column()
    localisation: string;

    @Column()
    libelle: string;

    @Column()
    type: string;

    @Column()
    niveau_sortie: string;

    @Column()
    langue_formation: string;

    @Column()
    site_web: string;
}