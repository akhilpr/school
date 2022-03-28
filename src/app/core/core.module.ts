import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    SharedModule,
    MatSidenavModule,
    MatListModule,
    
  ]})
export class CoreModule { }
