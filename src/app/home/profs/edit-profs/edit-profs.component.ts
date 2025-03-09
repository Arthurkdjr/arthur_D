
  import { Component, EventEmitter, Input, Output } from '@angular/core';
  import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
  import { ApiService } from '../../../service/api/api.service';
  import { CommonModule } from '@angular/common';
  import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
  @Component({
    selector: 'app-edit-profs',
    standalone: true, // Composant autonome
    imports: [CommonModule, ReactiveFormsModule], // Dépendances importées
    templateUrl: './edit-profs.component.html',
    styleUrls: ['./edit-profs.component.css']
  })
  export class EditProfsComponent {
    reactiveForm_edit_profs !: FormGroup;
    submitted: boolean = false
    loading_edit_profs: boolean = false
    @Input()
    profs_to_edit: any = {}
    form_details: any = {}
    loading_get_details_edit_profs_form = false
    constructor(private formBuilder: FormBuilder, public api: ApiService, public activeModal: NgbActiveModal) { 
        
    }
    ngOnInit(): void {
        this.get_details_edit_profs_form()
        this.update_form(this.profs_to_edit)
    }
    // mise à jour du formulaire
    update_form(profs_to_edit:any) {
        this.reactiveForm_edit_profs = this.formBuilder.group({
            first_name : [profs_to_edit.first_name, Validators.required],
last_name : [profs_to_edit.last_name, Validators.required],
email : [profs_to_edit.email],
phone : [profs_to_edit.phone]
        });
    }
  
    // acces facile au champs de votre formulaire
    get f(): any { return this.reactiveForm_edit_profs .controls; }
    // validation du formulaire
    onSubmit_edit_profs() {
        this.submitted = true;
        console.log(this.reactiveForm_edit_profs.value)
        // stop here if form is invalid
        if (this.reactiveForm_edit_profs.invalid) {
            return;
        }
        var profs = this.reactiveForm_edit_profs.value
        this.edit_profs({
        condition:JSON.stringify({id_profs:this.profs_to_edit.id_profs}),
        data:JSON.stringify(profs)
        })
    }
    // vider le formulaire
    onReset_edit_profs() {
        this.submitted = false;
        this.reactiveForm_edit_profs.reset();
    }
    edit_profs(profs: any) {
        this.loading_edit_profs = true;
        this.api.taf_post("profs/edit", profs, (reponse: any) => {
            if (reponse.status) {
                this.activeModal.close(reponse)
                console.log("Opération effectuée avec succés sur la table profs. Réponse= ", reponse);
                //this.onReset_edit_profs()
                this.api.Swal_success("Opération éffectuée avec succés")
            } else {
                console.log("L'opération sur la table profs a échoué. Réponse= ", reponse);
                this.api.Swal_error("L'opération a echoué")
            }
            this.loading_edit_profs = false;
        }, (error: any) => {
            this.loading_edit_profs = false;
        })
    }
    get_details_edit_profs_form() {
        this.loading_get_details_edit_profs_form = true;
        this.api.taf_post("profs/get_form_details", {}, (reponse: any) => {
          if (reponse.status) {
            this.form_details = reponse.data
            console.log("Opération effectuée avec succés sur la table profs. Réponse= ", reponse);
          } else {
            console.log("L'opération sur la table profs a échoué. Réponse= ", reponse);
            this.api.Swal_error("L'opération a echoué")
          }
          this.loading_get_details_edit_profs_form = false;
        }, (error: any) => {
        this.loading_get_details_edit_profs_form = false;
      })
    }
  }
  