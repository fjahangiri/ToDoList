import { Component, OnInit, Input } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { TaskService } from '../../service/task.service';
import { Task } from '../../class/task';
import { List } from '../../class/list';
import { ListService } from '../../service/list.service';
import { Listener } from 'selenium-webdriver';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-newtask',
  templateUrl: './newtask.component.html',
  styleUrls: ['./newtask.component.scss']
})
export class NewtaskComponent implements OnInit {
  currentList: List;
  @Input()
  isMain: Boolean;
  constructor(
    private taskservice: TaskService,
    private listservice: ListService
  ) {
    if (this.isMain === false) {
      listservice.CurrentList$.subscribe(list => (this.currentList = list));
    }
  }
  panelOpenState = false;
  title = new FormControl('');
  date = new FormControl('');
  description = new FormControl('');
  ngOnInit() {
    if (this.isMain === true) {
      this.listservice
        .getMainList()
        .subscribe(list => (this.currentList = list));
    }
  }
  onSubmit() {
  //  if (!this.title.invalid) {
      //  this.listservice.CurrentList$.subscribe(list => {
      // console.log(this.title.value);
      const t = new Task(
        this.title.value,
        this.description.value,
        this.date.value,
        this.currentList
      );
      this.taskservice.addTask(t).subscribe(response => {
        this.taskservice.addtolist(t);
      });
      // });
    }
 // }
}
