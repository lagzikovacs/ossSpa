import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MeEgyComponent } from './me-egy.component';

describe('MeEgyComponent', () => {
  let component: MeEgyComponent;
  let fixture: ComponentFixture<MeEgyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MeEgyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MeEgyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
