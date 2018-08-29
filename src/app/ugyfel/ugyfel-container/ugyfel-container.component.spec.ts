import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UgyfelContainerComponent } from './ugyfel-container.component';

describe('UgyfelContainerComponent', () => {
  let component: UgyfelContainerComponent;
  let fixture: ComponentFixture<UgyfelContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UgyfelContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UgyfelContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
