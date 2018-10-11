import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UgyfelTerComponent } from './ugyfel-ter.component';

describe('UgyfelTerComponent', () => {
  let component: UgyfelTerComponent;
  let fixture: ComponentFixture<UgyfelTerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UgyfelTerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UgyfelTerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
