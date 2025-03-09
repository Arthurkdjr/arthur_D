import { Component } from '@angular/core';
  import { ApiService } from '../../../service/api/api.service';
  import { AddEtudiantsComponent } from '../add-etudiants/add-etudiants.component';
  import { EditEtudiantsComponent } from '../edit-etudiants/edit-etudiants.component';
  import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
  @Component({
    selector: 'app-list-etudiants',
    standalone: true, // Composant autonome
    imports: [AddEtudiantsComponent,EditEtudiantsComponent], // Dépendances importées
    templateUrl: './list-etudiants.component.html',
    styleUrls: ['./list-etudiants.component.css']
  })
  export class ListEtudiantsComponent {
    loading_get_etudiants = false
    les_etudiantss: any[] = []
    selected_etudiants: any = undefined
    etudiants_to_edit: any = undefined
    loading_delete_etudiants = false
    constructor(public api: ApiService,private modalService: NgbModal) {
  
    }
    ngOnInit(): void {
      this.get_etudiants()
    }
    get_etudiants() {
      this.loading_get_etudiants = true;
      this.api.taf_post("etudiants/get", {}, (reponse: any) => {
        if (reponse.status) {
          this.les_etudiantss = reponse.data
          console.log("Opération effectuée avec succés sur la table etudiants. Réponse= ", reponse);
        } else {
          console.log("L'opération sur la table etudiants a échoué. Réponse= ", reponse);
          this.api.Swal_error("L'opération a echoué")
        }
        this.loading_get_etudiants = false;
      }, (error: any) => {
        this.loading_get_etudiants = false;
      })
    }
  
    voir_plus(one_etudiants: any) {
      this.selected_etudiants = one_etudiants
    }
    on_click_edit(one_etudiants: any) {
      this.etudiants_to_edit = one_etudiants
    }
    on_close_modal_edit(){
      this.etudiants_to_edit=undefined
    }
    delete_etudiants (etudiants : any){
      this.loading_delete_etudiants = true;
      this.api.taf_post("etudiants/delete", etudiants,(reponse: any)=>{
        //when success
        if(reponse.status){
          console.log("Opération effectuée avec succés sur la table etudiants . Réponse = ",reponse)
          this.get_etudiants()
          this.api.Swal_success("Opération éffectuée avec succés")
        }else{
          console.log("L'opération sur la table etudiants  a échoué. Réponse = ",reponse)
          this.api.Swal_error("L'opération a echoué")
        }
        this.loading_delete_etudiants = false;
      },
      (error: any)=>{
        //when error
        console.log("Erreur inconnue! ",error)
        this.loading_delete_etudiants = false;
      })
    }
    openModal_add_etudiants() {
      let options: any = {
        centered: true,
        scrollable: true,
        size: "lg"//'sm' | 'lg' | 'xl' | string
      }
      const modalRef = this.modalService.open(AddEtudiantsComponent, { ...options, backdrop: 'static' })
      modalRef.result.then((result: any) => {
        console.log('Modal closed with:', result);
        if (result?.status) {
          this.get_etudiants()
        } else {

        }
      })
    }
    openModal_edit_etudiants(one_etudiants: any) {
      let options: any = {
        centered: true,
        scrollable: true,
        size: "lg"//'sm' | 'lg' | 'xl' | string
      }
      const modalRef = this.modalService.open(EditEtudiantsComponent, { ...options, backdrop: 'static', })
      modalRef.componentInstance.etudiants_to_edit = one_etudiants;
      modalRef.result.then((result: any) => {
        console.log('Modal closed with:', result);
        if (result?.status) {
          this.get_etudiants()
        } else {

        }
      })
    }
  }