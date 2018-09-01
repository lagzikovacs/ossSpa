import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjektSzamlazasirendListComponent } from './projekt-szamlazasirend-list.component';

describe('ProjektSzamlazasirendListComponent', () => {
  let component: ProjektSzamlazasirendListComponent;
  let fixture: ComponentFixture<ProjektSzamlazasirendListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjektSzamlazasirendListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjektSzamlazasirendListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
