import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { ClassToggleService, HeaderComponent } from '@coreui/angular';

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

  constructor(private classToggler: ClassToggleService) {
    super();
  }

  ngOnInit(): void {
    
  }

  salir(){
    localStorage.removeItem('sesionLogin');
    localStorage.removeItem('rol');
    localStorage.removeItem('color');
    localStorage.removeItem('sesionLoginInicio');
  }
}