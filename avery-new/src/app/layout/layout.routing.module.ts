import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from "./layout.component";

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '',
          redirectTo: 'dashboard',
          pathMatch: 'full'
      },
      {
        path: 'dashboard',
        loadChildren: '../dashboard/dashboard.module#DashboardModule'
      },
      { path: 'orders',
        loadChildren: '../orders/orders.module#OrdersModule'
      },
      { path: 'tasks',
        loadChildren: '../tasks/tasks.module#TasksModule'
      }
    ]
  }
];


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LayoutRoutingModule { }
