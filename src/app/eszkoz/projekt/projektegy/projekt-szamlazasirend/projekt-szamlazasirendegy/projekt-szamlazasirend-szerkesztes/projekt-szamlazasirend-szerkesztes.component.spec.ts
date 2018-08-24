import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjektSzamlazasirendSzerkesztesComponent } from './projekt-szamlazasirend-szerkesztes.component';

describe('ProjektSzamlazasirendSzerkesztesComponent', () => {
  let component: ProjektSzamlazasirendSzerkesztesComponent;
  let fixture: ComponentFixture<ProjektSzamlazasirendSzerkesztesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjektSzamlazasirendSzerkesztesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjektSzamlazasirendSzerkesztesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
