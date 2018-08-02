import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DokumentumFeltoltesComponent } from './dokumentum-feltoltes.component';

describe('DokumentumFeltoltesComponent', () => {
  let component: DokumentumFeltoltesComponent;
  let fixture: ComponentFixture<DokumentumFeltoltesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DokumentumFeltoltesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DokumentumFeltoltesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
