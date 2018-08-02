import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjektMuszakiallapotComponent } from './projekt-muszakiallapot.component';

describe('ProjektMuszakiallapotComponent', () => {
  let component: ProjektMuszakiallapotComponent;
  let fixture: ComponentFixture<ProjektMuszakiallapotComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjektMuszakiallapotComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjektMuszakiallapotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
