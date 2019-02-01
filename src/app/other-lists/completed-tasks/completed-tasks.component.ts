import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/service/task.service';
import { Task } from 'src/app/class/task';
import { List } from 'src/app/class/list';

@Component({
  selector: 'app-completed-tasks',
  templateUrl: './completed-tasks.component.html',
  styleUrls: ['./completed-tasks.component.scss']
})
export class CompletedTasksComponent implements OnInit {
  tasks: Task[];
  currentList: List;
  constructor(private taskservice: TaskService) {
    taskservice.deleteTask$.subscribe(item => {
      this.tasks.splice(this.tasks.indexOf(item), 1);
    });
    taskservice.addtocomplete$.subscribe(item => this.tasks.push(item));

  }

  ngOnInit() {
    this.taskservice
      .getCompeletedTasks()
      .subscribe(items => (this.tasks = items));
    this.currentList = new List('Completed Tasks');
  }
}
