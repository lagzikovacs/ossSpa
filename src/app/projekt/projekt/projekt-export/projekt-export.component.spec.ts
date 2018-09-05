import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjektExportComponent } from './projekt-export.component';

describe('ProjektExportComponent', () => {
  let component: ProjektExportComponent;
  let fixture: ComponentFixture<ProjektExportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjektExportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjektExportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
