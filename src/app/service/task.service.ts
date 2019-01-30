import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Task } from '../class/task';
import { catchError } from 'rxjs/operators';
import {List} from '../class/list';
@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private deleteTaskSource = new Subject<Task>();
  deleteTask$ = this.deleteTaskSource.asObservable();
  private addtoListSource = new Subject<Task>();
  addtoList$ = this.addtoListSource.asObservable();
  constructor(private http: HttpClient) { }
  getAllTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(`http://localhost:3000/api/tasks`);
  }
  addTask(task: Task): Observable<{}> {
    console.log(task.list.title);
    return this.http.post<Task>(`http://localhost:3000/api/tasks`, task);
  }
  getTasksOfList(list: string): Observable<Task[]> {
    return this.http.get<Task[]>(`http://localhost:3000/api/tasks/query/${list}`);
  }
  findTask(task: Task): Observable<Task> {
    return this.http.get<Task>(`http://localhost:3000/api/tasks/${task._id}`);
  }
  updateTask(task: Task): Observable<{}> {
    console.log(task._id);
    return this.http.put<Task>(`http://localhost:3000/api/tasks/${task._id}`, task);
  }
  deleteTask(task: Task): Observable<{}> {
    return this.http.delete(`http://localhost:3000/api/tasks/${task._id}`);
  }
  getCompeletedTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(`http://localhost:3000/api/compeleted`);
  }
  deletefromList(task: Task) {
    this.deleteTaskSource.next(task);
  }
  addtolist(task: Task) {
    this.addtoListSource.next(task);
  }
}
