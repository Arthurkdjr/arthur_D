
  import { Component, EventEmitter, Input, Output } from '@angular/core';
  import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
  import { ApiService } from '../../../service/api/api.service';
  import { CommonModule } from '@angular/common';
  import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
  @Component({
    selector: 'app-edit-classes',
    standalone: true, // Composant autonome
    imports: [CommonModule, ReactiveFormsModule], // Dépendances importées
    templateUrl: './edit-classes.component.html',
    styleUrls: ['./edit-classes.component.css']
  })
  export class EditClassesComponent {
    reactiveForm_edit_classes !: FormGroup;
    submitted: boolean = false
    loading_edit_classes: boolean = false
    @Input()
    classes_to_edit: any = {}
    form_details: any = {}
    loading_get_details_edit_classes_form = false
    constructor(private formBuilder: FormBuilder, public api: ApiService, public activeModal: NgbActiveModal) { 
        
    }
    ngOnInit(): void {
        this.get_details_edit_classes_form()
        this.update_form(this.classes_to_edit)
    }
    // mise à jour du formulaire
    update_form(classes_to_edit:any) {
        this.reactiveForm_edit_classes = this.formBuilder.group({
            class_name : [classes_to_edit.class_name, Validators.required],
niveau : [classes_to_edit.niveau, Validators.required]
        });
    }
  
    // acces facile au champs de votre formulaire
    get f(): any { return this.reactiveForm_edit_classes .controls; }
    // validation du formulaire
    onSubmit_edit_classes() {
        this.submitted = true;
        console.log(this.reactiveForm_edit_classes.value)
        // stop here if form is invalid
        if (this.reactiveForm_edit_classes.invalid) {
            return;
        }
        var classes = this.reactiveForm_edit_classes.value
        this.edit_classes({
        condition:JSON.stringify({id_classes:this.classes_to_edit.id_classes}),
        data:JSON.stringify(classes)
        })
    }
    // vider le formulaire
    onReset_edit_classes() {
        this.submitted = false;
        this.reactiveForm_edit_classes.reset();
    }
    edit_classes(classes: any) {
        this.loading_edit_classes = true;
        this.api.taf_post("classes/edit", classes, (reponse: any) => {
            if (reponse.status) {
                this.activeModal.close(reponse)
                console.log("Opération effectuée avec succés sur la table classes. Réponse= ", reponse);
                //this.onReset_edit_classes()
                this.api.Swal_success("Opération éffectuée avec succés")
            } else {
                console.log("L'opération sur la table classes a échoué. Réponse= ", reponse);
                this.api.Swal_error("L'opération a echoué")
            }
            this.loading_edit_classes = false;
        }, (error: any) => {
            this.loading_edit_classes = false;
        })
    }
    get_details_edit_classes_form() {
        this.loading_get_details_edit_classes_form = true;
        this.api.taf_post("classes/get_form_details", {}, (reponse: any) => {
          if (reponse.status) {
            this.form_details = reponse.data
            console.log("Opération effectuée avec succés sur la table classes. Réponse= ", reponse);
          } else {
            console.log("L'opération sur la table classes a échoué. Réponse= ", reponse);
            this.api.Swal_error("L'opération a echoué")
          }
          this.loading_get_details_edit_classes_form = false;
        }, (error: any) => {
        this.loading_get_details_edit_classes_form = false;
      })
    }
  }
  