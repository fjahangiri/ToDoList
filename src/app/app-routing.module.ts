import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainListComponent } from './other-lists/main-list/main-list.component';
import { OtherListsComponent } from './other-lists/other-lists.component';
import { CompletedTasksComponent } from './other-lists/completed-tasks/completed-tasks.component';
const routes: Routes = [
  {
    path: 'tasklist/:_id',
    component: OtherListsComponent
  },
  {
    path: '**',
    component: MainListComponent
  },
  {
    path: 'completed',
    component: CompletedTasksComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
