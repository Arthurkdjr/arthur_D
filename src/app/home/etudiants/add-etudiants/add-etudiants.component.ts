
import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../../../service/api/api.service';
import { CommonModule } from '@angular/common';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-add-etudiants',
  standalone: true, // Composant autonome
  imports: [CommonModule, ReactiveFormsModule], // Dépendances importées
  templateUrl: './add-etudiants.component.html',
  styleUrls: ['./add-etudiants.component.css']
})
export class AddEtudiantsComponent {
  reactiveForm_add_etudiants !: FormGroup;
  submitted:boolean=false
  loading_add_etudiants :boolean=false
  form_details: any = {}
  loading_get_details_add_etudiants_form = false
  constructor(private formBuilder: FormBuilder,public api:ApiService, public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
      this.get_details_add_etudiants_form()
      this.init_form()
  }
  init_form() {
      this.reactiveForm_add_etudiants  = this.formBuilder.group({
          first_name: ["", Validators.required],
last_name: ["", Validators.required],
date_of_birth: [""],
class_id: [""]
      });
  }

  // acces facile au champs de votre formulaire
  get f(): any { return this.reactiveForm_add_etudiants .controls; }
  // validation du formulaire
  onSubmit_add_etudiants () {
      this.submitted = true;
      console.log(this.reactiveForm_add_etudiants .value)
      // stop here if form is invalid
      if (this.reactiveForm_add_etudiants .invalid) {
          return;
      }
      var etudiants =this.reactiveForm_add_etudiants .value
      this.add_etudiants (etudiants )
  }
  // vider le formulaire
  onReset_add_etudiants () {
      this.submitted = false;
      this.reactiveForm_add_etudiants .reset();
  }
  add_etudiants(etudiants: any) {
      this.loading_add_etudiants = true;
      this.api.taf_post("etudiants/add", etudiants, (reponse: any) => {
      this.loading_add_etudiants = false;
      if (reponse.status) {
          console.log("Opération effectuée avec succés sur la table etudiants. Réponse= ", reponse);
          this.onReset_add_etudiants()
          this.api.Swal_success("Opération éffectuée avec succés")
          this.activeModal.close(reponse)
      } else {
          console.log("L'opération sur la table etudiants a échoué. Réponse= ", reponse);
          this.api.Swal_error("L'opération a echoué")
      }
    }, (error: any) => {
        this.loading_add_etudiants = false;
    })
  }
  
  get_details_add_etudiants_form() {
      this.loading_get_details_add_etudiants_form = true;
      this.api.taf_post("etudiants/get_form_details", {}, (reponse: any) => {
        if (reponse.status) {
          this.form_details = reponse.data
          console.log("Opération effectuée avec succés sur la table etudiants. Réponse= ", reponse);
        } else {
          console.log("L'opération sur la table etudiants a échoué. Réponse= ", reponse);
          this.api.Swal_error("L'opération a echoué")
        }
        this.loading_get_details_add_etudiants_form = false;
      }, (error: any) => {
      this.loading_get_details_add_etudiants_form = false;
    })
  }
}
