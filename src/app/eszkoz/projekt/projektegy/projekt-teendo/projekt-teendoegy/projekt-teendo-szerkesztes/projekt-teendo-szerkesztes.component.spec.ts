import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjektTeendoSzerkesztesComponent } from './projekt-teendo-szerkesztes.component';

describe('ProjektTeendoSzerkesztesComponent', () => {
  let component: ProjektTeendoSzerkesztesComponent;
  let fixture: ComponentFixture<ProjektTeendoSzerkesztesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjektTeendoSzerkesztesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjektTeendoSzerkesztesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
