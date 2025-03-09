
  import { Component, EventEmitter, Input, Output } from '@angular/core';
  import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
  import { ApiService } from '../../../service/api/api.service';
  import { CommonModule } from '@angular/common';
  import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
  @Component({
    selector: 'app-edit-emploi-du-temps',
    standalone: true, // Composant autonome
    imports: [CommonModule, ReactiveFormsModule], // Dépendances importées
    templateUrl: './edit-emploi-du-temps.component.html',
    styleUrls: ['./edit-emploi-du-temps.component.css']
  })
  export class EditEmploiDuTempsComponent {
    reactiveForm_edit_emploi_du_temps !: FormGroup;
    submitted: boolean = false
    loading_edit_emploi_du_temps: boolean = false
    @Input()
    emploi_du_temps_to_edit: any = {}
    form_details: any = {}
    loading_get_details_edit_emploi_du_temps_form = false
    constructor(private formBuilder: FormBuilder, public api: ApiService, public activeModal: NgbActiveModal) { 
        
    }
    ngOnInit(): void {
        this.get_details_edit_emploi_du_temps_form()
        this.update_form(this.emploi_du_temps_to_edit)
    }
    // mise à jour du formulaire
    update_form(emploi_du_temps_to_edit:any) {
        this.reactiveForm_edit_emploi_du_temps = this.formBuilder.group({
            course_id : [emploi_du_temps_to_edit.course_id],
prof_id : [emploi_du_temps_to_edit.prof_id],
class_id : [emploi_du_temps_to_edit.class_id],
start_time : [emploi_du_temps_to_edit.start_time, Validators.required],
end_time : [emploi_du_temps_to_edit.end_time, Validators.required]
        });
    }
  
    // acces facile au champs de votre formulaire
    get f(): any { return this.reactiveForm_edit_emploi_du_temps .controls; }
    // validation du formulaire
    onSubmit_edit_emploi_du_temps() {
        this.submitted = true;
        console.log(this.reactiveForm_edit_emploi_du_temps.value)
        // stop here if form is invalid
        if (this.reactiveForm_edit_emploi_du_temps.invalid) {
            return;
        }
        var emploi_du_temps = this.reactiveForm_edit_emploi_du_temps.value
        this.edit_emploi_du_temps({
        condition:JSON.stringify({id_emploi_du_temps:this.emploi_du_temps_to_edit.id_emploi_du_temps}),
        data:JSON.stringify(emploi_du_temps)
        })
    }
    // vider le formulaire
    onReset_edit_emploi_du_temps() {
        this.submitted = false;
        this.reactiveForm_edit_emploi_du_temps.reset();
    }
    edit_emploi_du_temps(emploi_du_temps: any) {
        this.loading_edit_emploi_du_temps = true;
        this.api.taf_post("emploi_du_temps/edit", emploi_du_temps, (reponse: any) => {
            if (reponse.status) {
                this.activeModal.close(reponse)
                console.log("Opération effectuée avec succés sur la table emploi_du_temps. Réponse= ", reponse);
                //this.onReset_edit_emploi_du_temps()
                this.api.Swal_success("Opération éffectuée avec succés")
            } else {
                console.log("L'opération sur la table emploi_du_temps a échoué. Réponse= ", reponse);
                this.api.Swal_error("L'opération a echoué")
            }
            this.loading_edit_emploi_du_temps = false;
        }, (error: any) => {
            this.loading_edit_emploi_du_temps = false;
        })
    }
    get_details_edit_emploi_du_temps_form() {
        this.loading_get_details_edit_emploi_du_temps_form = true;
        this.api.taf_post("emploi_du_temps/get_form_details", {}, (reponse: any) => {
          if (reponse.status) {
            this.form_details = reponse.data
            console.log("Opération effectuée avec succés sur la table emploi_du_temps. Réponse= ", reponse);
          } else {
            console.log("L'opération sur la table emploi_du_temps a échoué. Réponse= ", reponse);
            this.api.Swal_error("L'opération a echoué")
          }
          this.loading_get_details_edit_emploi_du_temps_form = false;
        }, (error: any) => {
        this.loading_get_details_edit_emploi_du_temps_form = false;
      })
    }
  }
  