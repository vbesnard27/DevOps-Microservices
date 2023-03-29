import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Ecole } from 'src/entities/entities';
import { Router } from '@angular/router';
import { ApiHelperService } from '../services/api-helper.service';

@Component({
  selector: 'app-liste-ecole',
  templateUrl: './liste-ecole.component.html',
  styleUrls: ['./liste-ecole.component.css'],
})
export class ListeEcoleComponent {
  type!: string;
  esir = {
    libelle: 'Analyse de biologie médicale',
    type: 'BTS',
    niveau_sortie: 'Bac+2',
    credit_ects: '',
    langue_formation: 'Français',
    localisation: 'Rennes',
    adresse: '263 Av. Général Leclerc, 35042 Rennes',
    site_web: 'https://esir.univ-rennes.fr/',
    etablissement: 'Lycée Brequigny (BTS)',
    logo: '',
  };
  esir1 = {
    libelle: 'Analyse de biologie médicale',
    type: 'BTS',
    niveau_sortie: 'Bac+2',
    credit_ects: '',
    langue_formation: 'Français',
    localisation: 'Rennes',
    adresse: '263 Av. Général Leclerc, 35042 Rennes',
    site_web: 'https://esir.univ-rennes.fr/',
    etablissement: 'Lycée Brequigny (BUT)',
    logo: '',
  };
  ecoles: Ecole[] = [];
  ecoleToShow: Ecole[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apiHelperService: ApiHelperService
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => (this.type = params['type']));
    this.apiHelperService.get({ endpoint: '/ecoles' }).then((response) => {
      this.ecoles = response;
      this.ecoles.push(this.esir, this.esir1);
      console.log('eofne' + this.ecoles);
      this.isType();
    });
  }

  isType() {
    this.route.queryParams.subscribe((params) => {
      this.ecoleToShow = this.ecoles.filter(
        (ecole) => ecole.type == params['type']
      );
    });
  }
}
