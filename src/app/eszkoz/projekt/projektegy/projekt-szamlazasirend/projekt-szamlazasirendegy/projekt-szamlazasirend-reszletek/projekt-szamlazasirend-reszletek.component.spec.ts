import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjektSzamlazasirendReszletekComponent } from './projekt-szamlazasirend-reszletek.component';

describe('ProjektSzamlazasirendReszletekComponent', () => {
  let component: ProjektSzamlazasirendReszletekComponent;
  let fixture: ComponentFixture<ProjektSzamlazasirendReszletekComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjektSzamlazasirendReszletekComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjektSzamlazasirendReszletekComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
