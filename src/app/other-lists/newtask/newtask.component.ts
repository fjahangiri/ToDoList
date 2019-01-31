import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { TaskService } from '../../service/task.service';
import { Task } from '../../class/task';
import { List } from '../../class/list';
import { ListService } from '../../service/list.service';
import { Listener } from 'selenium-webdriver';
import { Observable } from 'rxjs';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-newtask',
  templateUrl: './newtask.component.html',
  styleUrls: ['./newtask.component.scss']
})
export class NewtaskComponent implements OnInit {
  @Input()
  currentList: List;
  @ViewChild('mypanel') mypanel;
  constructor(
    private taskservice: TaskService,
    private listservice: ListService,
    private router: ActivatedRoute
  ) {
  }
  panelOpenState = false;
  title = new FormControl('');
  date = new FormControl('');
  description = new FormControl('');
  ngOnInit() {
  }
  onSubmit() {
      const t = new Task(
        this.title.value,
        this.description.value,
        this.date.value,
        this.currentList
      );
      this.taskservice.addTask(t).subscribe(response => {
        this.taskservice.addtolist(response);
      });
      this.title.reset();
      this.date.reset();
      this.description.reset();
      this.mypanel.close();
    }
}
