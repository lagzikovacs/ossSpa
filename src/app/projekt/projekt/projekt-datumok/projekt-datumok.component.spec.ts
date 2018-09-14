import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjektDatumokComponent } from './projekt-datumok.component';

describe('ProjektDatumokComponent', () => {
  let component: ProjektDatumokComponent;
  let fixture: ComponentFixture<ProjektDatumokComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjektDatumokComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjektDatumokComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
