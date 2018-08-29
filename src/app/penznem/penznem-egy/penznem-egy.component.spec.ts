import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PenznemEgyComponent } from './penznem-egy.component';

describe('PenznemEgyComponent', () => {
  let component: PenznemEgyComponent;
  let fixture: ComponentFixture<PenznemEgyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PenznemEgyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PenznemEgyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
