import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DokumentumTorlesComponent } from './dokumentum-torles.component';

describe('DokumentumTorlesComponent', () => {
  let component: DokumentumTorlesComponent;
  let fixture: ComponentFixture<DokumentumTorlesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DokumentumTorlesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DokumentumTorlesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
