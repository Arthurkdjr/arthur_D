import { Component } from '@angular/core';
  import { ApiService } from '../../../service/api/api.service';
  import { AddUtilisateursComponent } from '../add-utilisateurs/add-utilisateurs.component';
  import { EditUtilisateursComponent } from '../edit-utilisateurs/edit-utilisateurs.component';
  import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
  @Component({
    selector: 'app-list-utilisateurs',
    standalone: true, // Composant autonome
    imports: [AddUtilisateursComponent,EditUtilisateursComponent], // Dépendances importées
    templateUrl: './list-utilisateurs.component.html',
    styleUrls: ['./list-utilisateurs.component.css']
  })
  export class ListUtilisateursComponent {
    loading_get_utilisateurs = false
    les_utilisateurss: any[] = []
    selected_utilisateurs: any = undefined
    utilisateurs_to_edit: any = undefined
    loading_delete_utilisateurs = false
    constructor(public api: ApiService,private modalService: NgbModal) {
  
    }
    ngOnInit(): void {
      this.get_utilisateurs()
    }
    get_utilisateurs() {
      this.loading_get_utilisateurs = true;
      this.api.taf_post("utilisateurs/get", {}, (reponse: any) => {
        if (reponse.status) {
          this.les_utilisateurss = reponse.data
          console.log("Opération effectuée avec succés sur la table utilisateurs. Réponse= ", reponse);
        } else {
          console.log("L'opération sur la table utilisateurs a échoué. Réponse= ", reponse);
          this.api.Swal_error("L'opération a echoué")
        }
        this.loading_get_utilisateurs = false;
      }, (error: any) => {
        this.loading_get_utilisateurs = false;
      })
    }
  
    voir_plus(one_utilisateurs: any) {
      this.selected_utilisateurs = one_utilisateurs
    }
    on_click_edit(one_utilisateurs: any) {
      this.utilisateurs_to_edit = one_utilisateurs
    }
    on_close_modal_edit(){
      this.utilisateurs_to_edit=undefined
    }
    delete_utilisateurs (utilisateurs : any){
      this.loading_delete_utilisateurs = true;
      this.api.taf_post("utilisateurs/delete", utilisateurs,(reponse: any)=>{
        //when success
        if(reponse.status){
          console.log("Opération effectuée avec succés sur la table utilisateurs . Réponse = ",reponse)
          this.get_utilisateurs()
          this.api.Swal_success("Opération éffectuée avec succés")
        }else{
          console.log("L'opération sur la table utilisateurs  a échoué. Réponse = ",reponse)
          this.api.Swal_error("L'opération a echoué")
        }
        this.loading_delete_utilisateurs = false;
      },
      (error: any)=>{
        //when error
        console.log("Erreur inconnue! ",error)
        this.loading_delete_utilisateurs = false;
      })
    }
    openModal_add_utilisateurs() {
      let options: any = {
        centered: true,
        scrollable: true,
        size: "lg"//'sm' | 'lg' | 'xl' | string
      }
      const modalRef = this.modalService.open(AddUtilisateursComponent, { ...options, backdrop: 'static' })
      modalRef.result.then((result: any) => {
        console.log('Modal closed with:', result);
        if (result?.status) {
          this.get_utilisateurs()
        } else {

        }
      })
    }
    openModal_edit_utilisateurs(one_utilisateurs: any) {
      let options: any = {
        centered: true,
        scrollable: true,
        size: "lg"//'sm' | 'lg' | 'xl' | string
      }
      const modalRef = this.modalService.open(EditUtilisateursComponent, { ...options, backdrop: 'static', })
      modalRef.componentInstance.utilisateurs_to_edit = one_utilisateurs;
      modalRef.result.then((result: any) => {
        console.log('Modal closed with:', result);
        if (result?.status) {
          this.get_utilisateurs()
        } else {

        }
      })
    }
  }