import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HelysegEgyComponent } from './helyseg-egy.component';

describe('HelysegEgyComponent', () => {
  let component: HelysegEgyComponent;
  let fixture: ComponentFixture<HelysegEgyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HelysegEgyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HelysegEgyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
