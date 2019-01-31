import { Component, OnInit, Input, OnChanges, SimpleChange, SimpleChanges } from '@angular/core';
import { Task } from 'src/app/class/task';
import { TaskService } from 'src/app/service/task.service';
import { ListService } from 'src/app/service/list.service';
import { FormControl, Validators } from '@angular/forms';
import { List } from 'src/app/class/list';
import { MatSnackBar } from '@angular/material';
import { NgOnChangesFeature } from '@angular/core/src/render3';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss']
})
export class TaskItemComponent implements OnChanges {
  done = false;
  displaymode = true;
  @Input()
  itemtype: number;

  @Input()
  task: Task;
  constructor(
    private taskservice: TaskService,
    private listservice: ListService,
    private snackbar: MatSnackBar
  ) {}
  title: FormControl;
  description: FormControl;
  date: FormControl;
  ngOnChanges(changes: SimpleChanges) {
    this.title = new FormControl(this.task.title);
    this.description = new FormControl(this.task.description);
    this.date = new FormControl(this.task.date);
  }
  movetask() {
    this.listservice.getMainList().subscribe(list => {
      const t = this.task;
      t.list = list;
      this.taskservice.updateTask(t).subscribe(response =>
        this.taskservice.deletefromList(this.task));
    });
  }
  taskdone() {
    this.task.done = true;
    this.taskservice.updateTask(this.task).subscribe(response => {
      this.taskservice.deletefromList(this.task);
    });
  }
  edit() {
    this.displaymode = false;
  }
 onSubmit() {
  const t = this.task;
  t.title = this.title.value;
  t.date = this.date.value;
  t.description = this.description.value;
  this.taskservice.updateTask(t).subscribe();
  this.displaymode = true;
 }
  deleteTask() {
    this.taskservice
      .deleteTask(this.task)
      .subscribe(response => this.taskservice.deletefromList(this.task));
  }
  cancleEdit() {
    this.displaymode = true;
  }
  openSnackBar() {
    this.snackbar.open(this.task.description , '', {duration: 4000} ,
     );
  }
}
