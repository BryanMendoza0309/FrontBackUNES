import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 

import { AdministradorRoutingModule } from './administrador-routing.module';
import { CuentasComponent } from './cuentas/cuentas.component';
import { DocsComponentsModule } from '@docs-components/docs-components.module';
import { IconModule } from '@coreui/icons-angular';
import {AutocompleteLibModule} from 'angular-ng-autocomplete';
import {
  ButtonGroupModule,
  ButtonModule,
  CardModule,
  DropdownModule,
  FormModule,
  GridModule,
  ListGroupModule,
  SharedModule,
  AccordionModule,
  BadgeModule,
  BreadcrumbModule,
  CarouselModule,
  CollapseModule,
  NavModule,
  PaginationModule,
  PlaceholderModule,
  PopoverModule,
  ProgressModule,
  SpinnerModule,
  TableModule,
  TabsModule,
  TooltipModule,
  UtilitiesModule,
  
  AlertModule,
  ModalModule,
  ToastModule,
} from '@coreui/angular';
import { PruebasComponent } from './pruebas/pruebas.component';


@NgModule({
  declarations: [CuentasComponent, PruebasComponent],
  imports: [
    CommonModule,
    AdministradorRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonGroupModule,
    ButtonModule,
    CardModule,
    DropdownModule,
    FormModule,
    GridModule,
    ListGroupModule,
    SharedModule,
    DocsComponentsModule,
    AccordionModule,
    BadgeModule,
    BreadcrumbModule,
    CarouselModule,
    CollapseModule,
    NavModule,
    PaginationModule,
    PlaceholderModule,
    PopoverModule,
    ProgressModule,
    SpinnerModule,
    TableModule,
    TabsModule,
    TooltipModule,
    UtilitiesModule,
    IconModule,
    AutocompleteLibModule,
    AlertModule,
    ModalModule,
    ToastModule,
  ]
})
export class AdministradorModule { }
