
import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../../../service/api/api.service';
import { CommonModule } from '@angular/common';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-add-utilisateurs',
  standalone: true, // Composant autonome
  imports: [CommonModule, ReactiveFormsModule], // Dépendances importées
  templateUrl: './add-utilisateurs.component.html',
  styleUrls: ['./add-utilisateurs.component.css']
})
export class AddUtilisateursComponent {
  reactiveForm_add_utilisateurs !: FormGroup;
  submitted:boolean=false
  loading_add_utilisateurs :boolean=false
  form_details: any = {}
  loading_get_details_add_utilisateurs_form = false
  constructor(private formBuilder: FormBuilder,public api:ApiService, public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
      this.get_details_add_utilisateurs_form()
      this.init_form()
  }
  init_form() {
      this.reactiveForm_add_utilisateurs  = this.formBuilder.group({
          username: ["", Validators.required],
email: ["", Validators.required],
mot_de_passe: ["", Validators.required]
      });
  }

  // acces facile au champs de votre formulaire
  get f(): any { return this.reactiveForm_add_utilisateurs .controls; }
  // validation du formulaire
  onSubmit_add_utilisateurs () {
      this.submitted = true;
      console.log(this.reactiveForm_add_utilisateurs .value)
      // stop here if form is invalid
      if (this.reactiveForm_add_utilisateurs .invalid) {
          return;
      }
      var utilisateurs =this.reactiveForm_add_utilisateurs .value
      this.add_utilisateurs (utilisateurs )
  }
  // vider le formulaire
  onReset_add_utilisateurs () {
      this.submitted = false;
      this.reactiveForm_add_utilisateurs .reset();
  }
  add_utilisateurs(utilisateurs: any) {
      this.loading_add_utilisateurs = true;
      this.api.taf_post("utilisateurs/add", utilisateurs, (reponse: any) => {
      this.loading_add_utilisateurs = false;
      if (reponse.status) {
          console.log("Opération effectuée avec succés sur la table utilisateurs. Réponse= ", reponse);
          this.onReset_add_utilisateurs()
          this.api.Swal_success("Opération éffectuée avec succés")
          this.activeModal.close(reponse)
      } else {
          console.log("L'opération sur la table utilisateurs a échoué. Réponse= ", reponse);
          this.api.Swal_error("L'opération a echoué")
      }
    }, (error: any) => {
        this.loading_add_utilisateurs = false;
    })
  }
  
  get_details_add_utilisateurs_form() {
      this.loading_get_details_add_utilisateurs_form = true;
      this.api.taf_post("utilisateurs/get_form_details", {}, (reponse: any) => {
        if (reponse.status) {
          this.form_details = reponse.data
          console.log("Opération effectuée avec succés sur la table utilisateurs. Réponse= ", reponse);
        } else {
          console.log("L'opération sur la table utilisateurs a échoué. Réponse= ", reponse);
          this.api.Swal_error("L'opération a echoué")
        }
        this.loading_get_details_add_utilisateurs_form = false;
      }, (error: any) => {
      this.loading_get_details_add_utilisateurs_form = false;
    })
  }
}
