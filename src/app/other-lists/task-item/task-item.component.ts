import { Component, OnInit, Input } from '@angular/core';
import { Task } from 'src/app/class/task';
import { TaskService } from 'src/app/service/task.service';
import { ListService } from 'src/app/service/list.service';
import { FormControl, Validators } from '@angular/forms';
import { List } from 'src/app/class/list';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss']
})
export class TaskItemComponent implements OnInit {
  done = false;
  displaymode = true;
  edit_date = false;
  edit_des = false;
  edit_title = false;
  disabled = false;
  @Input()
  task: Task;
  constructor(
    private taskservice: TaskService,
    private listservice: ListService,
    private snackbar: MatSnackBar
  ) {}
  title = new FormControl('');
  description = new FormControl('');
  date = new FormControl('');
  ngOnInit() {}
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
  editTitle() {
    this.edit_title = true;
    this.displaymode = false;
  }
  editDate() {
    this.edit_date = true;
    this.displaymode = false;
  }
  editDes() {
    this.edit_des = true;
    this.displaymode = false;
  }
  onSubmittitle() {
    const t = this.task;
    t.title = this.title.value;
    this.taskservice.updateTask(t).subscribe();
    this.displaymode = true;
    this.edit_title = false;
  }

  onSubmitdate() {
    const t = this.task;
    t.date = this.date.value;
    this.taskservice.updateTask(t).subscribe();
    this.displaymode = true;
    this.edit_date = false;
  }
  onSubmitdes() {
    const t = this.task;
    t.description = this.description.value;
    this.taskservice.updateTask(t).subscribe();
    this.displaymode = true;
    this.edit_title = false;
  }
  deleteTask() {
    this.taskservice
      .deleteTask(this.task)
      .subscribe(response => this.taskservice.deletefromList(this.task));
  }
  cancleEdit() {
    this.edit_date = false;
    this.edit_des = false;
    this.edit_title = false;
    this.displaymode = true;
  }
  openSnackBar() {
    this.snackbar.open(this.task.description , '', {duration: 4000} ,
     );
  }
}
