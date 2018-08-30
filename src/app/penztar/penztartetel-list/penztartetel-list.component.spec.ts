import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PenztartetelListComponent } from './penztartetel-list.component';

describe('PenztartetelListComponent', () => {
  let component: PenztartetelListComponent;
  let fixture: ComponentFixture<PenztartetelListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PenztartetelListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PenztartetelListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
