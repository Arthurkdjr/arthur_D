
import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../../../service/api/api.service';
import { CommonModule } from '@angular/common';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-add-profs',
  standalone: true, // Composant autonome
  imports: [CommonModule, ReactiveFormsModule], // Dépendances importées
  templateUrl: './add-profs.component.html',
  styleUrls: ['./add-profs.component.css']
})
export class AddProfsComponent {
  reactiveForm_add_profs !: FormGroup;
  submitted:boolean=false
  loading_add_profs :boolean=false
  form_details: any = {}
  loading_get_details_add_profs_form = false
  constructor(private formBuilder: FormBuilder,public api:ApiService, public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
      this.get_details_add_profs_form()
      this.init_form()
  }
  init_form() {
      this.reactiveForm_add_profs  = this.formBuilder.group({
          first_name: ["", Validators.required],
last_name: ["", Validators.required],
email: [""],
phone: [""]
      });
  }

  // acces facile au champs de votre formulaire
  get f(): any { return this.reactiveForm_add_profs .controls; }
  // validation du formulaire
  onSubmit_add_profs () {
      this.submitted = true;
      console.log(this.reactiveForm_add_profs .value)
      // stop here if form is invalid
      if (this.reactiveForm_add_profs .invalid) {
          return;
      }
      var profs =this.reactiveForm_add_profs .value
      this.add_profs (profs )
  }
  // vider le formulaire
  onReset_add_profs () {
      this.submitted = false;
      this.reactiveForm_add_profs .reset();
  }
  add_profs(profs: any) {
      this.loading_add_profs = true;
      this.api.taf_post("profs/add", profs, (reponse: any) => {
      this.loading_add_profs = false;
      if (reponse.status) {
          console.log("Opération effectuée avec succés sur la table profs. Réponse= ", reponse);
          this.onReset_add_profs()
          this.api.Swal_success("Opération éffectuée avec succés")
          this.activeModal.close(reponse)
      } else {
          console.log("L'opération sur la table profs a échoué. Réponse= ", reponse);
          this.api.Swal_error("L'opération a echoué")
      }
    }, (error: any) => {
        this.loading_add_profs = false;
    })
  }
  
  get_details_add_profs_form() {
      this.loading_get_details_add_profs_form = true;
      this.api.taf_post("profs/get_form_details", {}, (reponse: any) => {
        if (reponse.status) {
          this.form_details = reponse.data
          console.log("Opération effectuée avec succés sur la table profs. Réponse= ", reponse);
        } else {
          console.log("L'opération sur la table profs a échoué. Réponse= ", reponse);
          this.api.Swal_error("L'opération a echoué")
        }
        this.loading_get_details_add_profs_form = false;
      }, (error: any) => {
      this.loading_get_details_add_profs_form = false;
    })
  }
}
