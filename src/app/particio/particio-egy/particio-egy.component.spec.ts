import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParticioEgyComponent } from './particio-egy.component';

describe('ParticioEgyComponent', () => {
  let component: ParticioEgyComponent;
  let fixture: ComponentFixture<ParticioEgyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParticioEgyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParticioEgyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
