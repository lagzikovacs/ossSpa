import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjektSzamlazasirendEgyComponent } from './projekt-szamlazasirend-egy.component';

describe('ProjektSzamlazasirendEgyComponent', () => {
  let component: ProjektSzamlazasirendEgyComponent;
  let fixture: ComponentFixture<ProjektSzamlazasirendEgyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjektSzamlazasirendEgyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjektSzamlazasirendEgyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
