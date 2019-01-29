import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { List } from '../class/list';
import { catchError } from 'rxjs/operators';
import { map } from 'rxjs/operators';
import { Task } from '../class/task';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ListService {
  private CurrentListSource = new Subject<List>();
  CurrentList$ = this.CurrentListSource.asObservable();
  private AddListSource = new Subject<List>();
  AddList$ = this.AddListSource.asObservable();
  constructor(private http: HttpClient) { }
  AllLists: List[];
  getAllLists(): Observable<List[]> {
    return this.http.get<List[]>('http://localhost:3000/api/lists')
     .pipe(
       map(AllLists => {
         this.AllLists = AllLists;
        return AllLists;
      })
     );
  }
  findList(title: string): List {
    return this.AllLists.find(list => list.title === title);
  }
  updateList(l: List): Observable<{}> {
    return this.http.put<List> (`http://localhost:3000/api/lists/${l._id}`, l);
  }
  deleteList(l: List): Observable<{}> {
    return this.http.delete(`http://localhost:3000/api/lists/${l._id}`);
  }
  getList(l: List): Observable<List> {
    return this.http.get<List>(`http://localhost:3000/api/lists/${l._id}`);
  }
  addlist(l: List): Observable<{}> {
    return this.http.post<List> (`http://localhost:3000/api/lists`, l);
  }
  getMainList(): Observable<List> {
    return this.http.get<List>(`http://localhost:3000/api/MainList`);
  }
  setCurrentList(list: List) {
    this.CurrentListSource.next(list);
  }
  addlisttoAppbar(list: List) {
    this.AddListSource.next(list);
  }

}
