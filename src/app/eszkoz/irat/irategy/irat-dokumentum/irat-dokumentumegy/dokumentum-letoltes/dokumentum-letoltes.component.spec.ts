import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DokumentumLetoltesComponent } from './dokumentum-letoltes.component';

describe('DokumentumLetoltesComponent', () => {
  let component: DokumentumLetoltesComponent;
  let fixture: ComponentFixture<DokumentumLetoltesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DokumentumLetoltesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DokumentumLetoltesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
