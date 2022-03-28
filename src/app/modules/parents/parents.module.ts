import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ParentsRoutingModule } from './parents-routing.module';
import { ParentsComponent } from './parents.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { StudentsComponent } from './students/students/students.component';
import {MatIconModule} from '@angular/material/icon';

@NgModule({
  declarations: [
    ParentsComponent,
    StudentsComponent
  ],
  imports: [
    CommonModule,
    ParentsRoutingModule,
    SharedModule,
    MatIconModule
  ],
})
export class ParentsModule { }
