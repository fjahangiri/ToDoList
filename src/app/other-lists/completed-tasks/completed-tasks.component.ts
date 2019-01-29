import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/service/task.service';
import { Task } from 'src/app/class/task';

@Component({
  selector: 'app-completed-tasks',
  templateUrl: './completed-tasks.component.html',
  styleUrls: ['./completed-tasks.component.scss']
})
export class CompletedTasksComponent implements OnInit {
  tasks: Task[];
  constructor(private taskservice: TaskService) { }

  ngOnInit() {
    this.taskservice.getCompeletedTasks().subscribe(items => this.tasks = items);
  }

}
