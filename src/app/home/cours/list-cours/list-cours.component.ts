import { Component } from '@angular/core';
  import { ApiService } from '../../../service/api/api.service';
  import { AddCoursComponent } from '../add-cours/add-cours.component';
  import { EditCoursComponent } from '../edit-cours/edit-cours.component';
  import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
  @Component({
    selector: 'app-list-cours',
    standalone: true, // Composant autonome
    imports: [AddCoursComponent,EditCoursComponent], // Dépendances importées
    templateUrl: './list-cours.component.html',
    styleUrls: ['./list-cours.component.css']
  })
  export class ListCoursComponent {
    loading_get_cours = false
    les_courss: any[] = []
    selected_cours: any = undefined
    cours_to_edit: any = undefined
    loading_delete_cours = false
    constructor(public api: ApiService,private modalService: NgbModal) {
  
    }
    ngOnInit(): void {
      this.get_cours()
    }
    get_cours() {
      this.loading_get_cours = true;
      this.api.taf_post("cours/get", {}, (reponse: any) => {
        if (reponse.status) {
          this.les_courss = reponse.data
          console.log("Opération effectuée avec succés sur la table cours. Réponse= ", reponse);
        } else {
          console.log("L'opération sur la table cours a échoué. Réponse= ", reponse);
          this.api.Swal_error("L'opération a echoué")
        }
        this.loading_get_cours = false;
      }, (error: any) => {
        this.loading_get_cours = false;
      })
    }
  
    voir_plus(one_cours: any) {
      this.selected_cours = one_cours
    }
    on_click_edit(one_cours: any) {
      this.cours_to_edit = one_cours
    }
    on_close_modal_edit(){
      this.cours_to_edit=undefined
    }
    delete_cours (cours : any){
      this.loading_delete_cours = true;
      this.api.taf_post("cours/delete", cours,(reponse: any)=>{
        //when success
        if(reponse.status){
          console.log("Opération effectuée avec succés sur la table cours . Réponse = ",reponse)
          this.get_cours()
          this.api.Swal_success("Opération éffectuée avec succés")
        }else{
          console.log("L'opération sur la table cours  a échoué. Réponse = ",reponse)
          this.api.Swal_error("L'opération a echoué")
        }
        this.loading_delete_cours = false;
      },
      (error: any)=>{
        //when error
        console.log("Erreur inconnue! ",error)
        this.loading_delete_cours = false;
      })
    }
    openModal_add_cours() {
      let options: any = {
        centered: true,
        scrollable: true,
        size: "lg"//'sm' | 'lg' | 'xl' | string
      }
      const modalRef = this.modalService.open(AddCoursComponent, { ...options, backdrop: 'static' })
      modalRef.result.then((result: any) => {
        console.log('Modal closed with:', result);
        if (result?.status) {
          this.get_cours()
        } else {

        }
      })
    }
    openModal_edit_cours(one_cours: any) {
      let options: any = {
        centered: true,
        scrollable: true,
        size: "lg"//'sm' | 'lg' | 'xl' | string
      }
      const modalRef = this.modalService.open(EditCoursComponent, { ...options, backdrop: 'static', })
      modalRef.componentInstance.cours_to_edit = one_cours;
      modalRef.result.then((result: any) => {
        console.log('Modal closed with:', result);
        if (result?.status) {
          this.get_cours()
        } else {

        }
      })
    }
  }