import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DokumentumReszletekComponent } from './dokumentum-reszletek.component';

describe('DokumentumReszletekComponent', () => {
  let component: DokumentumReszletekComponent;
  let fixture: ComponentFixture<DokumentumReszletekComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DokumentumReszletekComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DokumentumReszletekComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
