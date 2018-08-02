import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjektSzamlazasirendComponent } from './projekt-szamlazasirend.component';

describe('ProjektSzamlazasirendComponent', () => {
  let component: ProjektSzamlazasirendComponent;
  let fixture: ComponentFixture<ProjektSzamlazasirendComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjektSzamlazasirendComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjektSzamlazasirendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
