import { Component, OnInit, ViewChild } from '@angular/core';
import {AdministradorService} from './../../../../servicios/administrador.service';
import Swal from 'sweetalert2';
import {LocalProyectService} from './../../../../servicios/local-proyect.service';
import { NgxSpinnerService } from "ngx-spinner";
@Component({
  selector: 'app-table-delegado',
  templateUrl: './table-delegado.component.html',
  styleUrls: ['./table-delegado.component.scss']
})
export class TableDelegadoComponent implements OnInit{

  constructor (private spinner: NgxSpinnerService, private administradorService: AdministradorService, private locaServicio:LocalProyectService){
    locaServicio.$emitter2.subscribe(() => {
      this.cargarTabla();
    });
  }

  
  @ViewChild('atributosAutoCompl') auComple: any;
  @ViewChild('paginado') paginados:any;
  search = "";
  title = 'pagination';
  POSTS:any;
  page:number = 1;
  count:number = 0;
  tableSize:number = 10;
  tableSizes:any = [5,10,15,20];

  ngOnInit(): void {
    
    this.cargarTabla();
    this.cargarCuentaAsambleistaAutoCom();
  }

  dataTabla:any = []; customStylesValidated = false; editNombre_ApellidoAsambleista:string = ""; editCorreoAsistente:string = "";
  editContrasenaAsistente:any= ""; iconEyeAsam:string = "password"; datosAsistenteInput:any=[];
  estado:number; id:number; id_perfil:number; dataAsam:any=[];
  cargarTabla(){
    this.spinner.show('sample');
    //Carga los datos de las cuentas de asambleistas en una tabla
   this.administradorService.cargarCuentaAsistente().then(data =>{
     this.dataTabla = data;
     this.limpiarModal();
     this.spinner.hide('sample');
   }).catch(error =>{
     console.log(error);
   })
 }

    onSubmit(){
      this.customStylesValidated = true;
      console.log('Submit... 1');
    }

    cambiarIconAsam(){ //Cambio de Icono en el Password Input Asambleista
      if(this.iconEyeAsam == "text"){
        this.iconEyeAsam = "password";
      }else{
        this.iconEyeAsam = "text";
      }
    }

    updateAsisCuentas(){
      
      let formUpdateAsambleista = {
        'name':this.editNombre_ApellidoAsambleista.toUpperCase(),
        'email':this.editCorreoAsistente,
        'password':this.editContrasenaAsistente,
        'perfil_id':this.id_perfil,
        'estado': this.estado,
        'id' : this.id
      }
      
      this.administradorService.updateAsamAsisCuentas(formUpdateAsambleista).then(data =>{
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: false,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
          }
        })
        Toast.fire({
          icon: 'success',
          title: 'Cuenta actualizada!'
        })
        this.cargarTabla();
      }).catch(error =>{
        console.log(error);
      })
    }

    camposInputEditar(name:any, email:any, estado:any, id:any, perfil_id:any){
      this.datosAsistenteInput = [];
      
      this.datosAsistenteInput.push(name);
      this.datosAsistenteInput.push(email);
      this.datosAsistenteInput.push(estado);
      this.datosAsistenteInput.push(id);
      this.datosAsistenteInput.push(perfil_id)
      
      this.cargarCamposModalEdit();
      
    }

    cargarCamposModalEdit(){
      this.editNombre_ApellidoAsambleista = this.datosAsistenteInput[0];
      this.editCorreoAsistente = this.datosAsistenteInput[1];
      this.estado = this .datosAsistenteInput[2];
      this.id = this.datosAsistenteInput[3];
      this.id_perfil = this.datosAsistenteInput[4];
      
    }

    
    limpiarModal(){
      this.editNombre_ApellidoAsambleista = "";
      this.editCorreoAsistente = "";
      this.editContrasenaAsistente = "";
      this.search = "";
      this.auComple.query = "";
      this.paginados;
      
    }

    onTableDataChange(event:any){
      this.page = event;
      
    }

    cuentasFilter:any = [];
  dataPaginate(_event:any){
    this.cuentasFilter=[];
    if(this.search == ""){
      
    }else{
      
      for (const x of this.dataTabla) {
        
        if(x.name.indexOf(this.search.toUpperCase()) > -1){
         this.cuentasFilter.push(x);
         
       };
      };
      this.cuentasFilter
    }
  }


  keyword = 'name'; 
  cargarCuentaAsambleistaAutoCom(){
    this.administradorService.cargarCuentaAsambleista().then(data =>{
      this.dataAsam = data;
      //this.POSTS = this.dataTabla;
      //this.limpiarModal();
      
    }).catch(error =>{
      console.log(error);
    })
  }

  notFound:any = "No se encuentra asambleista";
  selectEvent(item:any) { 
    // Evento para obtener valor del ng-autocomplete
    
    this.cargarCuentaAsambleistaAutoCom();
    this.id_perfil = item.perfil_id;
    
  }



  public visible = false;
  toggleLiveDemo() {
    this.visible = !this.visible;
    
  }

  handleLiveDemoChange(event: any) {
    this.visible = event;
  }

  spinnerConfig = {
    bdColor: 'rgba(0, 0, 0, 0.8)',
    size: 'medium',
    color: '#fff',
    type: 'square-jelly-box',
    fullScreen: true,
    template: null,
    showSpinner: false
  };

}