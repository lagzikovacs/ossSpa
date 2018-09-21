import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UgyfelNincsprojektComponent } from './ugyfel-nincsprojekt.component';

describe('UgyfelNincsprojektComponent', () => {
  let component: UgyfelNincsprojektComponent;
  let fixture: ComponentFixture<UgyfelNincsprojektComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UgyfelNincsprojektComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UgyfelNincsprojektComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
