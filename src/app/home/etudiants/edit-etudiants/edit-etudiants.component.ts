
  import { Component, EventEmitter, Input, Output } from '@angular/core';
  import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
  import { ApiService } from '../../../service/api/api.service';
  import { CommonModule } from '@angular/common';
  import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
  @Component({
    selector: 'app-edit-etudiants',
    standalone: true, // Composant autonome
    imports: [CommonModule, ReactiveFormsModule], // Dépendances importées
    templateUrl: './edit-etudiants.component.html',
    styleUrls: ['./edit-etudiants.component.css']
  })
  export class EditEtudiantsComponent {
    reactiveForm_edit_etudiants !: FormGroup;
    submitted: boolean = false
    loading_edit_etudiants: boolean = false
    @Input()
    etudiants_to_edit: any = {}
    form_details: any = {}
    loading_get_details_edit_etudiants_form = false
    constructor(private formBuilder: FormBuilder, public api: ApiService, public activeModal: NgbActiveModal) { 
        
    }
    ngOnInit(): void {
        this.get_details_edit_etudiants_form()
        this.update_form(this.etudiants_to_edit)
    }
    // mise à jour du formulaire
    update_form(etudiants_to_edit:any) {
        this.reactiveForm_edit_etudiants = this.formBuilder.group({
            first_name : [etudiants_to_edit.first_name, Validators.required],
last_name : [etudiants_to_edit.last_name, Validators.required],
date_of_birth : [etudiants_to_edit.date_of_birth],
class_id : [etudiants_to_edit.class_id]
        });
    }
  
    // acces facile au champs de votre formulaire
    get f(): any { return this.reactiveForm_edit_etudiants .controls; }
    // validation du formulaire
    onSubmit_edit_etudiants() {
        this.submitted = true;
        console.log(this.reactiveForm_edit_etudiants.value)
        // stop here if form is invalid
        if (this.reactiveForm_edit_etudiants.invalid) {
            return;
        }
        var etudiants = this.reactiveForm_edit_etudiants.value
        this.edit_etudiants({
        condition:JSON.stringify({id_etudiants:this.etudiants_to_edit.id_etudiants}),
        data:JSON.stringify(etudiants)
        })
    }
    // vider le formulaire
    onReset_edit_etudiants() {
        this.submitted = false;
        this.reactiveForm_edit_etudiants.reset();
    }
    edit_etudiants(etudiants: any) {
        this.loading_edit_etudiants = true;
        this.api.taf_post("etudiants/edit", etudiants, (reponse: any) => {
            if (reponse.status) {
                this.activeModal.close(reponse)
                console.log("Opération effectuée avec succés sur la table etudiants. Réponse= ", reponse);
                //this.onReset_edit_etudiants()
                this.api.Swal_success("Opération éffectuée avec succés")
            } else {
                console.log("L'opération sur la table etudiants a échoué. Réponse= ", reponse);
                this.api.Swal_error("L'opération a echoué")
            }
            this.loading_edit_etudiants = false;
        }, (error: any) => {
            this.loading_edit_etudiants = false;
        })
    }
    get_details_edit_etudiants_form() {
        this.loading_get_details_edit_etudiants_form = true;
        this.api.taf_post("etudiants/get_form_details", {}, (reponse: any) => {
          if (reponse.status) {
            this.form_details = reponse.data
            console.log("Opération effectuée avec succés sur la table etudiants. Réponse= ", reponse);
          } else {
            console.log("L'opération sur la table etudiants a échoué. Réponse= ", reponse);
            this.api.Swal_error("L'opération a echoué")
          }
          this.loading_get_details_edit_etudiants_form = false;
        }, (error: any) => {
        this.loading_get_details_edit_etudiants_form = false;
      })
    }
  }
  