
  import { Component, EventEmitter, Input, Output } from '@angular/core';
  import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
  import { ApiService } from '../../../service/api/api.service';
  import { CommonModule } from '@angular/common';
  import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
  @Component({
    selector: 'app-edit-cours',
    standalone: true, // Composant autonome
    imports: [CommonModule, ReactiveFormsModule], // Dépendances importées
    templateUrl: './edit-cours.component.html',
    styleUrls: ['./edit-cours.component.css']
  })
  export class EditCoursComponent {
    reactiveForm_edit_cours !: FormGroup;
    submitted: boolean = false
    loading_edit_cours: boolean = false
    @Input()
    cours_to_edit: any = {}
    form_details: any = {}
    loading_get_details_edit_cours_form = false
    constructor(private formBuilder: FormBuilder, public api: ApiService, public activeModal: NgbActiveModal) { 
        
    }
    ngOnInit(): void {
        this.get_details_edit_cours_form()
        this.update_form(this.cours_to_edit)
    }
    // mise à jour du formulaire
    update_form(cours_to_edit:any) {
        this.reactiveForm_edit_cours = this.formBuilder.group({
            course_name : [cours_to_edit.course_name, Validators.required],
description : [cours_to_edit.description],
class_id : [cours_to_edit.class_id]
        });
    }
  
    // acces facile au champs de votre formulaire
    get f(): any { return this.reactiveForm_edit_cours .controls; }
    // validation du formulaire
    onSubmit_edit_cours() {
        this.submitted = true;
        console.log(this.reactiveForm_edit_cours.value)
        // stop here if form is invalid
        if (this.reactiveForm_edit_cours.invalid) {
            return;
        }
        var cours = this.reactiveForm_edit_cours.value
        this.edit_cours({
        condition:JSON.stringify({id_cours:this.cours_to_edit.id_cours}),
        data:JSON.stringify(cours)
        })
    }
    // vider le formulaire
    onReset_edit_cours() {
        this.submitted = false;
        this.reactiveForm_edit_cours.reset();
    }
    edit_cours(cours: any) {
        this.loading_edit_cours = true;
        this.api.taf_post("cours/edit", cours, (reponse: any) => {
            if (reponse.status) {
                this.activeModal.close(reponse)
                console.log("Opération effectuée avec succés sur la table cours. Réponse= ", reponse);
                //this.onReset_edit_cours()
                this.api.Swal_success("Opération éffectuée avec succés")
            } else {
                console.log("L'opération sur la table cours a échoué. Réponse= ", reponse);
                this.api.Swal_error("L'opération a echoué")
            }
            this.loading_edit_cours = false;
        }, (error: any) => {
            this.loading_edit_cours = false;
        })
    }
    get_details_edit_cours_form() {
        this.loading_get_details_edit_cours_form = true;
        this.api.taf_post("cours/get_form_details", {}, (reponse: any) => {
          if (reponse.status) {
            this.form_details = reponse.data
            console.log("Opération effectuée avec succés sur la table cours. Réponse= ", reponse);
          } else {
            console.log("L'opération sur la table cours a échoué. Réponse= ", reponse);
            this.api.Swal_error("L'opération a echoué")
          }
          this.loading_get_details_edit_cours_form = false;
        }, (error: any) => {
        this.loading_get_details_edit_cours_form = false;
      })
    }
  }
  