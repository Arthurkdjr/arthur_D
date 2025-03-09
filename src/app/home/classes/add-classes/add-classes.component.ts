
import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../../../service/api/api.service';
import { CommonModule } from '@angular/common';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-add-classes',
  standalone: true, // Composant autonome
  imports: [CommonModule, ReactiveFormsModule], // Dépendances importées
  templateUrl: './add-classes.component.html',
  styleUrls: ['./add-classes.component.css']
})
export class AddClassesComponent {
  reactiveForm_add_classes !: FormGroup;
  submitted:boolean=false
  loading_add_classes :boolean=false
  form_details: any = {}
  loading_get_details_add_classes_form = false
  constructor(private formBuilder: FormBuilder,public api:ApiService, public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
      this.get_details_add_classes_form()
      this.init_form()
  }
  init_form() {
      this.reactiveForm_add_classes  = this.formBuilder.group({
          class_name: ["", Validators.required],
niveau: ["", Validators.required]
      });
  }

  // acces facile au champs de votre formulaire
  get f(): any { return this.reactiveForm_add_classes .controls; }
  // validation du formulaire
  onSubmit_add_classes () {
      this.submitted = true;
      console.log(this.reactiveForm_add_classes .value)
      // stop here if form is invalid
      if (this.reactiveForm_add_classes .invalid) {
          return;
      }
      var classes =this.reactiveForm_add_classes .value
      this.add_classes (classes )
  }
  // vider le formulaire
  onReset_add_classes () {
      this.submitted = false;
      this.reactiveForm_add_classes .reset();
  }
  add_classes(classes: any) {
      this.loading_add_classes = true;
      this.api.taf_post("classes/add", classes, (reponse: any) => {
      this.loading_add_classes = false;
      if (reponse.status) {
          console.log("Opération effectuée avec succés sur la table classes. Réponse= ", reponse);
          this.onReset_add_classes()
          this.api.Swal_success("Opération éffectuée avec succés")
          this.activeModal.close(reponse)
      } else {
          console.log("L'opération sur la table classes a échoué. Réponse= ", reponse);
          this.api.Swal_error("L'opération a echoué")
      }
    }, (error: any) => {
        this.loading_add_classes = false;
    })
  }
  
  get_details_add_classes_form() {
      this.loading_get_details_add_classes_form = true;
      this.api.taf_post("classes/get_form_details", {}, (reponse: any) => {
        if (reponse.status) {
          this.form_details = reponse.data
          console.log("Opération effectuée avec succés sur la table classes. Réponse= ", reponse);
        } else {
          console.log("L'opération sur la table classes a échoué. Réponse= ", reponse);
          this.api.Swal_error("L'opération a echoué")
        }
        this.loading_get_details_add_classes_form = false;
      }, (error: any) => {
      this.loading_get_details_add_classes_form = false;
    })
  }
}
