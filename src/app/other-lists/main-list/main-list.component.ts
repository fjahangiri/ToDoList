import { Component, OnInit } from '@angular/core';
import { List } from '../../class/list';
import { Observable } from 'rxjs';
import { Task } from '../../class/task';
import { TaskService } from '../../service/task.service';
import { ActivatedRoute } from '@angular/router';
import { ListService } from '../../service/list.service';
import { map, switchMap } from 'rxjs/operators';
@Component({
  selector: 'app-main-list',
  templateUrl: './main-list.component.html',
  styleUrls: ['./main-list.component.scss']
})
export class MainListComponent implements OnInit {
  currentList: List;
  allLists: List[];
  tasks: Task[];

  constructor(
    private taskservice: TaskService,
    private route: ActivatedRoute,
    private listservice: ListService
  ) {
    taskservice.deleteTask$.subscribe(item => {
      this.tasks.splice(this.tasks.indexOf(item), 1);
    });
    taskservice.addtoList$.subscribe(item => this.tasks.push(item));
  }
  ngOnInit() {
    this.listservice.getMainList().subscribe(mainlist => {
      this.currentList = mainlist;
      this.taskservice
        .getTasksOfList(mainlist._id)
        .subscribe(
          items => (this.tasks = items.filter(item => item.done === false))
        );
    });
  }
}
