import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Ecole } from 'src/entities/entities';

@Component({
  selector: 'app-ecole',
  templateUrl: './ecole.component.html',
  styleUrls: ['./ecole.component.css'],
})
export class EcoleComponent {
  ecole!: Ecole;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.ecole = JSON.parse(params['ecole']);
    });
  }
}
