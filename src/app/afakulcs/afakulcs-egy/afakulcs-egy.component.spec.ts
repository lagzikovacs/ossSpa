import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AfakulcsEgyComponent } from './afakulcs-egy.component';

describe('AfakulcsEgyComponent', () => {
  let component: AfakulcsEgyComponent;
  let fixture: ComponentFixture<AfakulcsEgyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AfakulcsEgyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AfakulcsEgyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
