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
  // temp$: Observable<any>;
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

    //    this.listservice.CurrentList$.subscribe(list => this.currentList =  list);
  }

  ngOnInit() {
    /* this.listservice.getAllLists().subscribe(itemss => {
      this.allLists = itemss;
      this.route.paramMap.pipe(
        switchMap((params: ParamMap) => {
        return this.taskservice.getTasksOfList(this.allLists.find(list => list.title === params.get('title'))) ; }
      )).subscribe(tasks => this.task = tasks);
    });*/
    // this.taskservice.getAllTasks().subscribe(task => this.tasks = task);
    this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        return this.taskservice.getTasksOfList(params.get('_id'));
      })
    ).subscribe(items => this.tasks = items);
    // .subscribe(task => {console.log('hellllllllo'); this.tasks = task; const c =  this.tasks[0]; console.log(c.title); } );
    //     this.route.paramMap.pipe(
    // switchMap((params: ParamMap) =>
    //  this.List = this.listservice.findList(params.get('title')));
    // );

    //    this.temp$ = this.route.paramMap.pipe(
    //    switchMap(params => {
    //    this.currentList = this.listservice.findList(params.get('title'));
    //  return new Observable();
    //    })
    //  );
    //  this.taskservice.getTasksOfList(this.currentList).subscribe(tasks => this.tasks = tasks);
  }
}
