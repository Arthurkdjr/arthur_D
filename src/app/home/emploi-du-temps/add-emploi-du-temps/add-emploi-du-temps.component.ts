
import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../../../service/api/api.service';
import { CommonModule } from '@angular/common';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-add-emploi-du-temps',
  standalone: true, // Composant autonome
  imports: [CommonModule, ReactiveFormsModule], // Dépendances importées
  templateUrl: './add-emploi-du-temps.component.html',
  styleUrls: ['./add-emploi-du-temps.component.css']
})
export class AddEmploiDuTempsComponent {
  reactiveForm_add_emploi_du_temps !: FormGroup;
  submitted:boolean=false
  loading_add_emploi_du_temps :boolean=false
  form_details: any = {}
  loading_get_details_add_emploi_du_temps_form = false
  constructor(private formBuilder: FormBuilder,public api:ApiService, public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
      this.get_details_add_emploi_du_temps_form()
      this.init_form()
  }
  init_form() {
      this.reactiveForm_add_emploi_du_temps  = this.formBuilder.group({
          course_id: [""],
prof_id: [""],
class_id: [""],
start_time: ["", Validators.required],
end_time: ["", Validators.required]
      });
  }

  // acces facile au champs de votre formulaire
  get f(): any { return this.reactiveForm_add_emploi_du_temps .controls; }
  // validation du formulaire
  onSubmit_add_emploi_du_temps () {
      this.submitted = true;
      console.log(this.reactiveForm_add_emploi_du_temps .value)
      // stop here if form is invalid
      if (this.reactiveForm_add_emploi_du_temps .invalid) {
          return;
      }
      var emploi_du_temps =this.reactiveForm_add_emploi_du_temps .value
      this.add_emploi_du_temps (emploi_du_temps )
  }
  // vider le formulaire
  onReset_add_emploi_du_temps () {
      this.submitted = false;
      this.reactiveForm_add_emploi_du_temps .reset();
  }
  add_emploi_du_temps(emploi_du_temps: any) {
      this.loading_add_emploi_du_temps = true;
      this.api.taf_post("emploi_du_temps/add", emploi_du_temps, (reponse: any) => {
      this.loading_add_emploi_du_temps = false;
      if (reponse.status) {
          console.log("Opération effectuée avec succés sur la table emploi_du_temps. Réponse= ", reponse);
          this.onReset_add_emploi_du_temps()
          this.api.Swal_success("Opération éffectuée avec succés")
          this.activeModal.close(reponse)
      } else {
          console.log("L'opération sur la table emploi_du_temps a échoué. Réponse= ", reponse);
          this.api.Swal_error("L'opération a echoué")
      }
    }, (error: any) => {
        this.loading_add_emploi_du_temps = false;
    })
  }
  
  get_details_add_emploi_du_temps_form() {
      this.loading_get_details_add_emploi_du_temps_form = true;
      this.api.taf_post("emploi_du_temps/get_form_details", {}, (reponse: any) => {
        if (reponse.status) {
          this.form_details = reponse.data
          console.log("Opération effectuée avec succés sur la table emploi_du_temps. Réponse= ", reponse);
        } else {
          console.log("L'opération sur la table emploi_du_temps a échoué. Réponse= ", reponse);
          this.api.Swal_error("L'opération a echoué")
        }
        this.loading_get_details_add_emploi_du_temps_form = false;
      }, (error: any) => {
      this.loading_get_details_add_emploi_du_temps_form = false;
    })
  }
}
