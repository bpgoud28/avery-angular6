import { AddTaskComponent } from './add-task.component';
import { TasksComponent } from './tasks.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    {
        path: '',
        component: TasksComponent,
        children: [
          {
            path: 'tasks',
            loadChildren: './tasks/tasks.module#TasksModule'
          }
        ]
    },
    {
      path: 'add',
      component: AddTaskComponent
  }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TasksRoutingModule { }
