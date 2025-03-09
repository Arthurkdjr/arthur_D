import { Component } from '@angular/core';
  import { ApiService } from '../../../service/api/api.service';
  import { AddEmploiDuTempsComponent } from '../add-emploi-du-temps/add-emploi-du-temps.component';
  import { EditEmploiDuTempsComponent } from '../edit-emploi-du-temps/edit-emploi-du-temps.component';
  import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
  @Component({
    selector: 'app-list-emploi-du-temps',
    standalone: true, // Composant autonome
    imports: [AddEmploiDuTempsComponent,EditEmploiDuTempsComponent], // Dépendances importées
    templateUrl: './list-emploi-du-temps.component.html',
    styleUrls: ['./list-emploi-du-temps.component.css']
  })
  export class ListEmploiDuTempsComponent {
    loading_get_emploi_du_temps = false
    les_emploi_du_tempss: any[] = []
    selected_emploi_du_temps: any = undefined
    emploi_du_temps_to_edit: any = undefined
    loading_delete_emploi_du_temps = false
    constructor(public api: ApiService,private modalService: NgbModal) {
  
    }
    ngOnInit(): void {
      this.get_emploi_du_temps()
    }
    get_emploi_du_temps() {
      this.loading_get_emploi_du_temps = true;
      this.api.taf_post("emploi_du_temps/get", {}, (reponse: any) => {
        if (reponse.status) {
          this.les_emploi_du_tempss = reponse.data
          console.log("Opération effectuée avec succés sur la table emploi_du_temps. Réponse= ", reponse);
        } else {
          console.log("L'opération sur la table emploi_du_temps a échoué. Réponse= ", reponse);
          this.api.Swal_error("L'opération a echoué")
        }
        this.loading_get_emploi_du_temps = false;
      }, (error: any) => {
        this.loading_get_emploi_du_temps = false;
      })
    }
  
    voir_plus(one_emploi_du_temps: any) {
      this.selected_emploi_du_temps = one_emploi_du_temps
    }
    on_click_edit(one_emploi_du_temps: any) {
      this.emploi_du_temps_to_edit = one_emploi_du_temps
    }
    on_close_modal_edit(){
      this.emploi_du_temps_to_edit=undefined
    }
    delete_emploi_du_temps (emploi_du_temps : any){
      this.loading_delete_emploi_du_temps = true;
      this.api.taf_post("emploi_du_temps/delete", emploi_du_temps,(reponse: any)=>{
        //when success
        if(reponse.status){
          console.log("Opération effectuée avec succés sur la table emploi_du_temps . Réponse = ",reponse)
          this.get_emploi_du_temps()
          this.api.Swal_success("Opération éffectuée avec succés")
        }else{
          console.log("L'opération sur la table emploi_du_temps  a échoué. Réponse = ",reponse)
          this.api.Swal_error("L'opération a echoué")
        }
        this.loading_delete_emploi_du_temps = false;
      },
      (error: any)=>{
        //when error
        console.log("Erreur inconnue! ",error)
        this.loading_delete_emploi_du_temps = false;
      })
    }
    openModal_add_emploi_du_temps() {
      let options: any = {
        centered: true,
        scrollable: true,
        size: "lg"//'sm' | 'lg' | 'xl' | string
      }
      const modalRef = this.modalService.open(AddEmploiDuTempsComponent, { ...options, backdrop: 'static' })
      modalRef.result.then((result: any) => {
        console.log('Modal closed with:', result);
        if (result?.status) {
          this.get_emploi_du_temps()
        } else {

        }
      })
    }
    openModal_edit_emploi_du_temps(one_emploi_du_temps: any) {
      let options: any = {
        centered: true,
        scrollable: true,
        size: "lg"//'sm' | 'lg' | 'xl' | string
      }
      const modalRef = this.modalService.open(EditEmploiDuTempsComponent, { ...options, backdrop: 'static', })
      modalRef.componentInstance.emploi_du_temps_to_edit = one_emploi_du_temps;
      modalRef.result.then((result: any) => {
        console.log('Modal closed with:', result);
        if (result?.status) {
          this.get_emploi_du_temps()
        } else {

        }
      })
    }
  }