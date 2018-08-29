import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeendoEgyComponent } from './teendo-egy.component';

describe('TeendoEgyComponent', () => {
  let component: TeendoEgyComponent;
  let fixture: ComponentFixture<TeendoEgyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeendoEgyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeendoEgyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
