import { Component, OnInit, ViewChild } from '@angular/core';
import * as scriptjs from 'scriptjs';
import { IonSlides } from '@ionic/angular';
import { InfUltimasPage } from '../inf-ultimas/inf-ultimas.page';
import { formatDate } from '@angular/common';
@Component({
  selector: 'app-ultimas',
  templateUrl: './ultimas.page.html',
  styleUrls: ['./ultimas.page.scss'],
})
export class UltimasPage implements OnInit {

  datetime: string;

  constructor() {
    // Inicializar datetime con la fecha actual
    this.datetime = formatDate(new Date(), 'yyyy-MM-dd', 'en-US');
  }
  ngOnInit(): void {
    
  }

  handleRefresh(event) {
    setTimeout(() => {
      // Any calls to load data go here
      event.target.complete();
    }, 2000);
  };

}
