import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from '@angular/forms';

import { AddTaskComponent } from './add-task.component';
import { TasksRoutingModule } from './tasks.routing.module';
import { TasksComponent } from './tasks.component';

import { DataTableModule } from "angular-6-datatable";
import { DataFilterPipe } from '../shared/pipes/data-filter.pipe';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    TasksComponent,
    AddTaskComponent
  ],
  imports: [
    CommonModule,
    TasksRoutingModule,
    ReactiveFormsModule,
    DataTableModule,
    NgbModule
  ],
  providers: [  ]
})
export class TasksModule { }
