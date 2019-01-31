import { switchMap } from 'rxjs/operators';
import { Component, OnInit, Input } from '@angular/core';
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
  currentList: List;
  allLists: List[];
  constructor(
    private taskservice: TaskService,
    private route: ActivatedRoute,
    private listservice: ListService,
    private router: Router
  ) {
    taskservice.deleteTask$.subscribe(item => {
      this.tasks.splice(this.tasks.indexOf(item), 1);
    });
    taskservice.addtoList$.subscribe(item => {
      this.tasks.push(item);
     // taskservice.getTasksOfList(item.list._id).subscribe(items => this.tasks = items);
    }
    );
 }

  ngOnInit() {
    this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        return this.taskservice.getTasksOfList(params.get('_id'));
      })
    ).subscribe(items => this.tasks = items.filter(item => item.done === false));
    this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        return this.listservice.getList(params.get('_id'));
      })
    ).subscribe(item => this.currentList = item);
  }
  deleteList() {
    this.listservice.deleteCurrentList(this.currentList);
    this.listservice.deleteList(this.currentList).subscribe();
    this.router.navigate(['./dailyTasks']);
  }
}
