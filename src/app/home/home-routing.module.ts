import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListClassesComponent } from './classes/list-classes/list-classes.component';
import { ListCoursComponent } from './cours/list-cours/list-cours.component';
import { ListEmploiDuTempsComponent } from './emploi-du-temps/list-emploi-du-temps/list-emploi-du-temps.component';
import { ListEtudiantsComponent } from './etudiants/list-etudiants/list-etudiants.component';
import { ListProfsComponent } from './profs/list-profs/list-profs.component';

const routes: Routes = [
  {path:"",component:ListClassesComponent},
{path:"classes",component:ListClassesComponent},
{path:"cours",component:ListCoursComponent},
{path:"emploi_du_temps",component:ListEmploiDuTempsComponent},
{path:"etudiants",component:ListEtudiantsComponent},
{path:"profs",component:ListProfsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }