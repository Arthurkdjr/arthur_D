
import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../../../service/api/api.service';
import { CommonModule } from '@angular/common';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-add-cours',
  standalone: true, // Composant autonome
  imports: [CommonModule, ReactiveFormsModule], // Dépendances importées
  templateUrl: './add-cours.component.html',
  styleUrls: ['./add-cours.component.css']
})
export class AddCoursComponent {
  reactiveForm_add_cours !: FormGroup;
  submitted:boolean=false
  loading_add_cours :boolean=false
  form_details: any = {}
  loading_get_details_add_cours_form = false
  constructor(private formBuilder: FormBuilder,public api:ApiService, public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
      this.get_details_add_cours_form()
      this.init_form()
  }
  init_form() {
      this.reactiveForm_add_cours  = this.formBuilder.group({
          course_name: ["", Validators.required],
description: [""],
class_id: [""]
      });
  }

  // acces facile au champs de votre formulaire
  get f(): any { return this.reactiveForm_add_cours .controls; }
  // validation du formulaire
  onSubmit_add_cours () {
      this.submitted = true;
      console.log(this.reactiveForm_add_cours .value)
      // stop here if form is invalid
      if (this.reactiveForm_add_cours .invalid) {
          return;
      }
      var cours =this.reactiveForm_add_cours .value
      this.add_cours (cours )
  }
  // vider le formulaire
  onReset_add_cours () {
      this.submitted = false;
      this.reactiveForm_add_cours .reset();
  }
  add_cours(cours: any) {
      this.loading_add_cours = true;
      this.api.taf_post("cours/add", cours, (reponse: any) => {
      this.loading_add_cours = false;
      if (reponse.status) {
          console.log("Opération effectuée avec succés sur la table cours. Réponse= ", reponse);
          this.onReset_add_cours()
          this.api.Swal_success("Opération éffectuée avec succés")
          this.activeModal.close(reponse)
      } else {
          console.log("L'opération sur la table cours a échoué. Réponse= ", reponse);
          this.api.Swal_error("L'opération a echoué")
      }
    }, (error: any) => {
        this.loading_add_cours = false;
    })
  }
  
  get_details_add_cours_form() {
      this.loading_get_details_add_cours_form = true;
      this.api.taf_post("cours/get_form_details", {}, (reponse: any) => {
        if (reponse.status) {
          this.form_details = reponse.data
          console.log("Opération effectuée avec succés sur la table cours. Réponse= ", reponse);
        } else {
          console.log("L'opération sur la table cours a échoué. Réponse= ", reponse);
          this.api.Swal_error("L'opération a echoué")
        }
        this.loading_get_details_add_cours_form = false;
      }, (error: any) => {
      this.loading_get_details_add_cours_form = false;
    })
  }
}
