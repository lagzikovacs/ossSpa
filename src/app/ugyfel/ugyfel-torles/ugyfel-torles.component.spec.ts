import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UgyfelTorlesComponent } from './ugyfel-torles.component';

describe('UgyfelTorlesComponent', () => {
  let component: UgyfelTorlesComponent;
  let fixture: ComponentFixture<UgyfelTorlesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UgyfelTorlesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UgyfelTorlesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
