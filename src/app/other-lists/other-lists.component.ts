import { switchMap } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { TaskService } from '../service/task.service';
import { Observable } from 'rxjs';
import { Task } from '../class/task';
import { ListService } from '../service/list.service';
import { List } from '../class/list';
@Component({
  selector: 'app-other-lists',
  templateUrl: './other-lists.component.html',
  styleUrls: ['./other-lists.component.scss']
})
export class OtherListsComponent implements OnInit {
  tasks: Task[];
  // task: Task[];
  currentList: List;
  allLists: List[];
 tasks$: Observable<Task[]>;
  constructor(
    private taskservice: TaskService,
    private route: ActivatedRoute,
    private listservice: ListService
  ) {
    taskservice.deleteTask$.subscribe(item => {
      this.tasks.splice(this.tasks.indexOf(item), 1);
    });
    taskservice.addtoList$.subscribe(item =>
      this.tasks.push(item)
    );
 }

  ngOnInit() {
    this.tasks$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        return this.taskservice.getTasksOfList(params.get('_id'));
      })
    );
    this.tasks$.subscribe(items => this.tasks = items);
  }
}
