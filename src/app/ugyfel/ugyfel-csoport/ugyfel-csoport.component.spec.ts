import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UgyfelCsoportComponent } from './ugyfel-csoport.component';

describe('UgyfelCsoportComponent', () => {
  let component: UgyfelCsoportComponent;
  let fixture: ComponentFixture<UgyfelCsoportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UgyfelCsoportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UgyfelCsoportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
