import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-home',
  standalone: true, // Composant autonome
  imports: [RouterModule,NgbDropdownModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  menu:any={
    titre:"Menu",
    items:[
      {libelle:"Classes",path:"/home/classes"},
{libelle:"Cours",path:"/home/cours"},
{libelle:"EmploiDuTemps",path:"/home/emploi_du_temps"},
{libelle:"Etudiants",path:"/home/etudiants"},
{libelle:"Profs",path:"/home/profs"}
    ]
  }
}
