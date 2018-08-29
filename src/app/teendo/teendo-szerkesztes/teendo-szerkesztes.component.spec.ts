import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeendoSzerkesztesComponent } from './teendo-szerkesztes.component';

describe('TeendoSzerkesztesComponent', () => {
  let component: TeendoSzerkesztesComponent;
  let fixture: ComponentFixture<TeendoSzerkesztesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeendoSzerkesztesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeendoSzerkesztesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
