import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewtaskComponent } from './newtask/newtask.component';
import {OtherListsComponent} from './other-lists.component';
import { MaterialModule} from '../material/material.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MainListComponent } from './main-list/main-list.component';
import { TaskItemComponent } from './task-item/task-item.component';
import { CompletedTasksComponent } from './completed-tasks/completed-tasks.component';

@NgModule({
  declarations: [
    NewtaskComponent,
    OtherListsComponent,
    MainListComponent,
    TaskItemComponent,
    CompletedTasksComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class OtherListsModule { }
