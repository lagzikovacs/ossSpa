import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UgyfelterDokumentumComponent } from './ugyfelter-dokumentum.component';

describe('UgyfelterDokumentumComponent', () => {
  let component: UgyfelterDokumentumComponent;
  let fixture: ComponentFixture<UgyfelterDokumentumComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UgyfelterDokumentumComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UgyfelterDokumentumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
