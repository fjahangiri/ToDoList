import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { List } from '../class/list';
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
  private _mobileQueryListener: () => void;
  alllists: List[];
  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    private listservice: ListService,
    private router: Router
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    listservice.AddList$.subscribe(item => {
      this.alllists.push(item);
    });
    listservice.deleteCurrentList$.subscribe(item => {
      this.alllists.splice(
        this.alllists.indexOf(
          this.alllists.find(_item => _item._id === item._id)
        ),
        1
      );
    });
    listservice.updateAppbar$.subscribe(item => {
      this.alllists[
        this.alllists.findIndex(olditem => item._id === olditem._id)
      ] = item;
    });
  }
  ngOnInit() {
    this.getList();
  }
  getList(): void {
    this.listservice
      .getAllLists()
      .subscribe(itemss => (this.alllists = itemss));
  }
}
