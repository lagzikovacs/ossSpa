import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UgyfelterComponent } from './ugyfelter.component';

describe('UgyfelterComponent', () => {
  let component: UgyfelterComponent;
  let fixture: ComponentFixture<UgyfelterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UgyfelterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UgyfelterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
