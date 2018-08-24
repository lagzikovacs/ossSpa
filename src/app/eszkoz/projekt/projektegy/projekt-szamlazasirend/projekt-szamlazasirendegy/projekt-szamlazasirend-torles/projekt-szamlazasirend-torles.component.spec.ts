import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjektSzamlazasirendTorlesComponent } from './projekt-szamlazasirend-torles.component';

describe('ProjektSzamlazasirendTorlesComponent', () => {
  let component: ProjektSzamlazasirendTorlesComponent;
  let fixture: ComponentFixture<ProjektSzamlazasirendTorlesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjektSzamlazasirendTorlesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjektSzamlazasirendTorlesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
