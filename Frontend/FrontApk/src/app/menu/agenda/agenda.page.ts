import { Component, OnInit } from '@angular/core';
import { LoadingController, NavController } from '@ionic/angular';
import { BlogsService } from 'src/app/api/rest/blogs.service';

@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.page.html',
  styleUrls: ['./agenda.page.scss'],
})
export class AgendaPage implements OnInit {
  fechaNow: string;
  blogAgenda:any = [];
  limNext=2;

  constructor(private service:BlogsService, private loadCont:LoadingController, private Nav:NavController) { }

  ngOnInit() {
    this.fechaActual();
    this.cargarAgenda();
  }

  cargarAgenda(){
    this.showLoading();
    this.service.ListarBlogsAgenda().subscribe((data:any)=> {
      console.log(data)
      this.blogAgenda = data.map(item => ({
        blogtitulo:item.blogtitulo,
        blogdescripcion:item.blogdescripcion,
        name: `${item.perfil.lastName} ${item.perfil.firstName}`,
        jurisdiction: `${item.perfil.jurisdiction}: ${item.perfil.territorialDivision}`,
        id:item.id
      }))
      this.loadCont.dismiss();
    })
  }

  fechaActual(){
    const now = new Date(); // Obtiene la fecha y hora actuales
// Crea una matriz de nombres de mes

    const formattedDate = now.toLocaleDateString("es-ES", {
      day: "numeric",
      month: "long",
      year: "numeric"
    }); // Formatea la fecha y hora actuales en el formato de fecha y hora local con el mes con el nombre correspondiente

    this.fechaNow = formattedDate // Muestra la fecha y hora actuales en formato "DD de mes de AAAA" en la consola

  }

  handleRefresh(event){
    this.cargarAgenda();
    setTimeout(() => {
      event.target.complete();
    }, 2000);
  }

  async showLoading() {
    const loading = await this.loadCont.create({
      message: 'Cargando...',
      cssClass: 'custom-loading',
      //spinner:'lines-sharp'
    });

    loading.present();
  }

  goBlog(id){
    this.Nav.navigateForward(`inf-ultimas/${id}`);
  }


}
