import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeendoTorlesComponent } from './teendo-torles.component';

describe('TeendoTorlesComponent', () => {
  let component: TeendoTorlesComponent;
  let fixture: ComponentFixture<TeendoTorlesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeendoTorlesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeendoTorlesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
