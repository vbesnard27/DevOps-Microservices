import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EcoleComponent } from './ecole/ecole.component';
import { HomeComponent } from './home/home.component';
import { ListeEcoleComponent } from './liste-ecole/liste-ecole.component';
import { LoginComponent } from './login/login.component';
import { NavComponent } from './nav/nav.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'ecoles', component: ListeEcoleComponent },
  { path: 'ecole', component: EcoleComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
