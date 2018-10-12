import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UgyfelProjektComponent } from './ugyfel-projekt.component';

describe('UgyfelProjektComponent', () => {
  let component: UgyfelProjektComponent;
  let fixture: ComponentFixture<UgyfelProjektComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UgyfelProjektComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UgyfelProjektComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
