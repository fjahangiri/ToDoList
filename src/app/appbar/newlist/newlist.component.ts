import { Component, OnInit, Inject } from '@angular/core';
import { ListService } from '../../service/list.service';
import { List } from '../../class/list';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

export interface DialogData {
  name: string;
}

@Component({
  selector: 'app-newlist',
  templateUrl: './newlist.component.html',
  styleUrls: ['./newlist.component.scss']
})
export class NewlistComponent implements OnInit {
  constructor(private dialog: MatDialog) {}
  // name: string;
  name = new FormControl('', [Validators.required]);
  // l: List;
  ngOnInit() {}
  openNewlist(): void {
    const dialogRef = this.dialog.open(NewlistDialogComponent, {
      width: '700px',
      data: { name: this.name }
    });
  }
}

@Component({
  selector: 'app-newlist-dialog',
  templateUrl: './newlistdialog.component.html'
})
export class NewlistDialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<NewlistDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private listservice: ListService
  ) {}
  l: List;

  ngOnInit() {
    this.listservice.getAllLists();
  }

  CancleClick(): void {
    this.dialogRef.close();
  }

  OkClick(name: string): void {
    this.l = new List(name);
    this.listservice
      .addlist(this.l)
      .subscribe(response => this.listservice.addlisttoAppbar(response));
  }
}
