import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UgyfelterlogComponent } from './ugyfelterlog.component';

describe('UgyfelterlogComponent', () => {
  let component: UgyfelterlogComponent;
  let fixture: ComponentFixture<UgyfelterlogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UgyfelterlogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UgyfelterlogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
