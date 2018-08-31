import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DokumentumEgyComponent } from './dokumentum-egy.component';

describe('DokumentumEgyComponent', () => {
  let component: DokumentumEgyComponent;
  let fixture: ComponentFixture<DokumentumEgyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DokumentumEgyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DokumentumEgyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
