import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjektSzamlazasirendegyComponent } from './projekt-szamlazasirendegy.component';

describe('ProjektSzamlazasirendegyComponent', () => {
  let component: ProjektSzamlazasirendegyComponent;
  let fixture: ComponentFixture<ProjektSzamlazasirendegyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjektSzamlazasirendegyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjektSzamlazasirendegyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
