import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Ecole } from 'src/entities/entities';
import { Router } from '@angular/router';
@Component({
  selector: 'app-ecole-card',
  templateUrl: './ecole-card.component.html',
  styleUrls: ['./ecole-card.component.css'],
})
export class EcoleCardComponent {
  @Input() ecole!: Ecole;

  constructor(private router: Router) {}

  goto(to: string, ecole: Ecole): void {
    this.router.navigate([to], {
      queryParams: { ecole: JSON.stringify(this.ecole) },
    });
  }
}
