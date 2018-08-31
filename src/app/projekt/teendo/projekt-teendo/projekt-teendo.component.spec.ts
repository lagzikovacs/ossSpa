import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjektTeendoComponent } from './projekt-teendo.component';

describe('ProjektTeendoComponent', () => {
  let component: ProjektTeendoComponent;
  let fixture: ComponentFixture<ProjektTeendoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjektTeendoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjektTeendoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
