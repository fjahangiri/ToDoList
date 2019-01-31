
import {MediaMatcher} from '@angular/cdk/layout';
import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { List} from '../class/list';
import { Observable } from 'rxjs';
import { ListService } from '../service/list.service';
import { FormBuilder, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-appbar',
  templateUrl: './appbar.component.html',
  styleUrls: ['./appbar.component.scss']
})
export class AppbarComponent implements OnInit {
  panelOpenState = false;
  mobileQuery: MediaQueryList;
  header = 'Daily Tasks';
  currentList: List;
  private _mobileQueryListener: () => void;
  alllists: List[];
  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher,
    private listservice: ListService , private router: Router
    ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    listservice.AddList$.subscribe(item => {
      this.alllists.push(item);
    });
    listservice.deleteCurrentList$.subscribe(item => {
      this.alllists.splice(this.alllists.indexOf(item), 1);
    });
  }
  ngOnInit() {
    this.getList();
  }
  getList(): void {
    this.listservice.getAllLists().subscribe(itemss => this.alllists = itemss);
  }
  selectList(list: List) {
    this.header = list.title;
    this.currentList = list;

  }
  displayCompletedTasks() {
    this.header = 'Completed Tasks';
  }
}
