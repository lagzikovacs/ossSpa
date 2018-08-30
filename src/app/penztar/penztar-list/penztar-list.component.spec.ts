import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PenztarListComponent } from './penztar-list.component';

describe('PenztarListComponent', () => {
  let component: PenztarListComponent;
  let fixture: ComponentFixture<PenztarListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PenztarListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PenztarListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
