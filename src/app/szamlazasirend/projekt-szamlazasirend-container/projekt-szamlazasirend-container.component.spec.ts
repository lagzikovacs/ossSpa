import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjektSzamlazasirendContainerComponent } from './projekt-szamlazasirend-container.component';

describe('ProjektSzamlazasirendContainerComponent', () => {
  let component: ProjektSzamlazasirendContainerComponent;
  let fixture: ComponentFixture<ProjektSzamlazasirendContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjektSzamlazasirendContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjektSzamlazasirendContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
