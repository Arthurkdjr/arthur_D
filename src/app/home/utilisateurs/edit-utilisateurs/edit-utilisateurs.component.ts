
  import { Component, EventEmitter, Input, Output } from '@angular/core';
  import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
  import { ApiService } from '../../../service/api/api.service';
  import { CommonModule } from '@angular/common';
  import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
  @Component({
    selector: 'app-edit-utilisateurs',
    standalone: true, // Composant autonome
    imports: [CommonModule, ReactiveFormsModule], // Dépendances importées
    templateUrl: './edit-utilisateurs.component.html',
    styleUrls: ['./edit-utilisateurs.component.css']
  })
  export class EditUtilisateursComponent {
    reactiveForm_edit_utilisateurs !: FormGroup;
    submitted: boolean = false
    loading_edit_utilisateurs: boolean = false
    @Input()
    utilisateurs_to_edit: any = {}
    form_details: any = {}
    loading_get_details_edit_utilisateurs_form = false
    constructor(private formBuilder: FormBuilder, public api: ApiService, public activeModal: NgbActiveModal) { 
        
    }
    ngOnInit(): void {
        this.get_details_edit_utilisateurs_form()
        this.update_form(this.utilisateurs_to_edit)
    }
    // mise à jour du formulaire
    update_form(utilisateurs_to_edit:any) {
        this.reactiveForm_edit_utilisateurs = this.formBuilder.group({
            username : [utilisateurs_to_edit.username, Validators.required],
email : [utilisateurs_to_edit.email, Validators.required],
mot_de_passe : [utilisateurs_to_edit.mot_de_passe, Validators.required]
        });
    }
  
    // acces facile au champs de votre formulaire
    get f(): any { return this.reactiveForm_edit_utilisateurs .controls; }
    // validation du formulaire
    onSubmit_edit_utilisateurs() {
        this.submitted = true;
        console.log(this.reactiveForm_edit_utilisateurs.value)
        // stop here if form is invalid
        if (this.reactiveForm_edit_utilisateurs.invalid) {
            return;
        }
        var utilisateurs = this.reactiveForm_edit_utilisateurs.value
        this.edit_utilisateurs({
        condition:JSON.stringify({id_utilisateurs:this.utilisateurs_to_edit.id_utilisateurs}),
        data:JSON.stringify(utilisateurs)
        })
    }
    // vider le formulaire
    onReset_edit_utilisateurs() {
        this.submitted = false;
        this.reactiveForm_edit_utilisateurs.reset();
    }
    edit_utilisateurs(utilisateurs: any) {
        this.loading_edit_utilisateurs = true;
        this.api.taf_post("utilisateurs/edit", utilisateurs, (reponse: any) => {
            if (reponse.status) {
                this.activeModal.close(reponse)
                console.log("Opération effectuée avec succés sur la table utilisateurs. Réponse= ", reponse);
                //this.onReset_edit_utilisateurs()
                this.api.Swal_success("Opération éffectuée avec succés")
            } else {
                console.log("L'opération sur la table utilisateurs a échoué. Réponse= ", reponse);
                this.api.Swal_error("L'opération a echoué")
            }
            this.loading_edit_utilisateurs = false;
        }, (error: any) => {
            this.loading_edit_utilisateurs = false;
        })
    }
    get_details_edit_utilisateurs_form() {
        this.loading_get_details_edit_utilisateurs_form = true;
        this.api.taf_post("utilisateurs/get_form_details", {}, (reponse: any) => {
          if (reponse.status) {
            this.form_details = reponse.data
            console.log("Opération effectuée avec succés sur la table utilisateurs. Réponse= ", reponse);
          } else {
            console.log("L'opération sur la table utilisateurs a échoué. Réponse= ", reponse);
            this.api.Swal_error("L'opération a echoué")
          }
          this.loading_get_details_edit_utilisateurs_form = false;
        }, (error: any) => {
        this.loading_get_details_edit_utilisateurs_form = false;
      })
    }
  }
  