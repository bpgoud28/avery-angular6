import { OrderDetailsComponent } from './order-details.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrdersComponent } from './orders.component';

const routes: Routes = [
    {
        path: '',
        component: OrdersComponent,
        children: [
          {
            path: 'orders',
            loadChildren: './orders/orders.module#ordersModule'
          }
        ]
    },
    {
      path: 'orderDetails/:id',
      component: OrderDetailsComponent,
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class OrdersRoutingModule { }
