import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjektTeendoReszletekComponent } from './projekt-teendo-reszletek.component';

describe('ProjektTeendoReszletekComponent', () => {
  let component: ProjektTeendoReszletekComponent;
  let fixture: ComponentFixture<ProjektTeendoReszletekComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjektTeendoReszletekComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjektTeendoReszletekComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
