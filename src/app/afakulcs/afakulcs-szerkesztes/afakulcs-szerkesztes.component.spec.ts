import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AfakulcsSzerkesztesComponent } from './afakulcs-szerkesztes.component';

describe('AfakulcsSzerkesztesComponent', () => {
  let component: AfakulcsSzerkesztesComponent;
  let fixture: ComponentFixture<AfakulcsSzerkesztesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AfakulcsSzerkesztesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AfakulcsSzerkesztesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
