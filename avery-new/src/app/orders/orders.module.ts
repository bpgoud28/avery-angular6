import { OrderByPipe } from './../shared/pipes/orderBy.pipe';
import { OrdersService } from './../shared/services/orders.service';
import { OrderDetailsComponent } from './order-details.component';
import { OrdersRoutingModule } from './orders.routing.module';
import { OrdersComponent } from './orders.component';
import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";

import { DataTableModule } from "angular-6-datatable";
import { DataFilterPipe } from '../shared/pipes/data-filter.pipe';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    OrdersComponent,
    OrderDetailsComponent,
    OrderByPipe
  ],
  imports: [
    CommonModule,
    OrdersRoutingModule,
    DataTableModule,
    NgbModule,
    FormsModule
  ],
  providers: [ OrdersService ]
})
export class OrdersModule { }
