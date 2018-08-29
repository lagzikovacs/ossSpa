import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AfakulcsTorlesComponent } from './afakulcs-torles.component';

describe('AfakulcsTorlesComponent', () => {
  let component: AfakulcsTorlesComponent;
  let fixture: ComponentFixture<AfakulcsTorlesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AfakulcsTorlesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AfakulcsTorlesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
