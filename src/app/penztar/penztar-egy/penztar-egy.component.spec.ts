import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PenztarEgyComponent } from './penztar-egy.component';

describe('PenztarEgyComponent', () => {
  let component: PenztarEgyComponent;
  let fixture: ComponentFixture<PenztarEgyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PenztarEgyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PenztarEgyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
