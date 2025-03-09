import { Component } from '@angular/core';
  import { ApiService } from '../../../service/api/api.service';
  import { AddProfsComponent } from '../add-profs/add-profs.component';
  import { EditProfsComponent } from '../edit-profs/edit-profs.component';
  import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
  @Component({
    selector: 'app-list-profs',
    standalone: true, // Composant autonome
    imports: [AddProfsComponent,EditProfsComponent], // Dépendances importées
    templateUrl: './list-profs.component.html',
    styleUrls: ['./list-profs.component.css']
  })
  export class ListProfsComponent {
    loading_get_profs = false
    les_profss: any[] = []
    selected_profs: any = undefined
    profs_to_edit: any = undefined
    loading_delete_profs = false
    constructor(public api: ApiService,private modalService: NgbModal) {
  
    }
    ngOnInit(): void {
      this.get_profs()
    }
    get_profs() {
      this.loading_get_profs = true;
      this.api.taf_post("profs/get", {}, (reponse: any) => {
        if (reponse.status) {
          this.les_profss = reponse.data
          console.log("Opération effectuée avec succés sur la table profs. Réponse= ", reponse);
        } else {
          console.log("L'opération sur la table profs a échoué. Réponse= ", reponse);
          this.api.Swal_error("L'opération a echoué")
        }
        this.loading_get_profs = false;
      }, (error: any) => {
        this.loading_get_profs = false;
      })
    }
  
    voir_plus(one_profs: any) {
      this.selected_profs = one_profs
    }
    on_click_edit(one_profs: any) {
      this.profs_to_edit = one_profs
    }
    on_close_modal_edit(){
      this.profs_to_edit=undefined
    }
    delete_profs (profs : any){
      this.loading_delete_profs = true;
      this.api.taf_post("profs/delete", profs,(reponse: any)=>{
        //when success
        if(reponse.status){
          console.log("Opération effectuée avec succés sur la table profs . Réponse = ",reponse)
          this.get_profs()
          this.api.Swal_success("Opération éffectuée avec succés")
        }else{
          console.log("L'opération sur la table profs  a échoué. Réponse = ",reponse)
          this.api.Swal_error("L'opération a echoué")
        }
        this.loading_delete_profs = false;
      },
      (error: any)=>{
        //when error
        console.log("Erreur inconnue! ",error)
        this.loading_delete_profs = false;
      })
    }
    openModal_add_profs() {
      let options: any = {
        centered: true,
        scrollable: true,
        size: "lg"//'sm' | 'lg' | 'xl' | string
      }
      const modalRef = this.modalService.open(AddProfsComponent, { ...options, backdrop: 'static' })
      modalRef.result.then((result: any) => {
        console.log('Modal closed with:', result);
        if (result?.status) {
          this.get_profs()
        } else {

        }
      })
    }
    openModal_edit_profs(one_profs: any) {
      let options: any = {
        centered: true,
        scrollable: true,
        size: "lg"//'sm' | 'lg' | 'xl' | string
      }
      const modalRef = this.modalService.open(EditProfsComponent, { ...options, backdrop: 'static', })
      modalRef.componentInstance.profs_to_edit = one_profs;
      modalRef.result.then((result: any) => {
        console.log('Modal closed with:', result);
        if (result?.status) {
          this.get_profs()
        } else {

        }
      })
    }
  }