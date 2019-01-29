import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OtherListsComponent } from './other-lists.component';

describe('OtherListComponent', () => {
  let component: OtherListsComponent;
  let fixture: ComponentFixture<OtherListsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OtherListsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OtherListsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
