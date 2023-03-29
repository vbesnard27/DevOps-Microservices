import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent {
  showOverlay = false;

  constructor(private router: Router) {}

  goto(to: string): void {
    this.router.navigateByUrl(to);
  }

  openOverlay(): void {
    this.showOverlay = !this.showOverlay;
  }
}
