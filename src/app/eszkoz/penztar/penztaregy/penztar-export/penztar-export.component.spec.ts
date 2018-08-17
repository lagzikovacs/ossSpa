import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PenztarExportComponent } from './penztar-export.component';

describe('PenztarExportComponent', () => {
  let component: PenztarExportComponent;
  let fixture: ComponentFixture<PenztarExportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PenztarExportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PenztarExportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
