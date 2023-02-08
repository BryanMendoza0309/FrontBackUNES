import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';

import { ClassToggleService, HeaderComponent } from '@coreui/angular';
import { AdministradorService } from 'src/app/servicios/administrador.service';
@Component({
  selector: 'app-default-header',
  templateUrl: './default-header.component.html',
})
export class DefaultHeaderComponent extends HeaderComponent implements OnInit {

  @Input() sidebarId: string = "sidebar";
  @Input() childMessage: string;
  
  public newMessages = new Array(4)
  public newTasks = new Array(5)
  public newNotifications = new Array(5)

  constructor(private classToggler: ClassToggleService, private administradorService:AdministradorService, private sanitizer: DomSanitizer) {
    super();
  }

  ngOnInit(): void {
    this.mostrarImg();
  }

  salir(){
    localStorage.removeItem('sesionLogin');
    localStorage.removeItem('rol');
    localStorage.removeItem('color');
    localStorage.removeItem('sesionLoginInicio');
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    localStorage.removeItem('idAsambPerf');
  }

  thumbnail: any;
  mostrarImg(){
    debugger
    this.administradorService.getImg().subscribe((baseImage : any) => {
      //alert(JSON.stringify(data.image));
      debugger
      let objectURL = 'data:image/jpeg;base64,' + baseImage;
      debugger

       this.thumbnail = this.sanitizer.bypassSecurityTrustUrl(objectURL);
        debugger
    });
  }
}
