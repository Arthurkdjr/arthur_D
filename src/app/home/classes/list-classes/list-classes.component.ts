import { Component } from '@angular/core';
  import { ApiService } from '../../../service/api/api.service';
  import { AddClassesComponent } from '../add-classes/add-classes.component';
  import { EditClassesComponent } from '../edit-classes/edit-classes.component';
  import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
  @Component({
    selector: 'app-list-classes',
    standalone: true, // Composant autonome
    imports: [AddClassesComponent,EditClassesComponent], // Dépendances importées
    templateUrl: './list-classes.component.html',
    styleUrls: ['./list-classes.component.css']
  })
  export class ListClassesComponent {
    loading_get_classes = false
    les_classess: any[] = []
    selected_classes: any = undefined
    classes_to_edit: any = undefined
    loading_delete_classes = false
    constructor(public api: ApiService,private modalService: NgbModal) {
  
    }
    ngOnInit(): void {
      this.get_classes()
    }
    get_classes() {
      this.loading_get_classes = true;
      this.api.taf_post("classes/get", {}, (reponse: any) => {
        if (reponse.status) {
          this.les_classess = reponse.data
          console.log("Opération effectuée avec succés sur la table classes. Réponse= ", reponse);
        } else {
          console.log("L'opération sur la table classes a échoué. Réponse= ", reponse);
          this.api.Swal_error("L'opération a echoué")
        }
        this.loading_get_classes = false;
      }, (error: any) => {
        this.loading_get_classes = false;
      })
    }
  
    voir_plus(one_classes: any) {
      this.selected_classes = one_classes
    }
    on_click_edit(one_classes: any) {
      this.classes_to_edit = one_classes
    }
    on_close_modal_edit(){
      this.classes_to_edit=undefined
    }
    delete_classes (classes : any){
      this.loading_delete_classes = true;
      this.api.taf_post("classes/delete", classes,(reponse: any)=>{
        //when success
        if(reponse.status){
          console.log("Opération effectuée avec succés sur la table classes . Réponse = ",reponse)
          this.get_classes()
          this.api.Swal_success("Opération éffectuée avec succés")
        }else{
          console.log("L'opération sur la table classes  a échoué. Réponse = ",reponse)
          this.api.Swal_error("L'opération a echoué")
        }
        this.loading_delete_classes = false;
      },
      (error: any)=>{
        //when error
        console.log("Erreur inconnue! ",error)
        this.loading_delete_classes = false;
      })
    }
    openModal_add_classes() {
      let options: any = {
        centered: true,
        scrollable: true,
        size: "lg"//'sm' | 'lg' | 'xl' | string
      }
      const modalRef = this.modalService.open(AddClassesComponent, { ...options, backdrop: 'static' })
      modalRef.result.then((result: any) => {
        console.log('Modal closed with:', result);
        if (result?.status) {
          this.get_classes()
        } else {

        }
      })
    }
    openModal_edit_classes(one_classes: any) {
      let options: any = {
        centered: true,
        scrollable: true,
        size: "lg"//'sm' | 'lg' | 'xl' | string
      }
      const modalRef = this.modalService.open(EditClassesComponent, { ...options, backdrop: 'static', })
      modalRef.componentInstance.classes_to_edit = one_classes;
      modalRef.result.then((result: any) => {
        console.log('Modal closed with:', result);
        if (result?.status) {
          this.get_classes()
        } else {

        }
      })
    }
  }