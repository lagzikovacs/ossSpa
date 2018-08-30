import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjektReszletekComponent } from './projekt-reszletek.component';

describe('ProjektReszletekComponent', () => {
  let component: ProjektReszletekComponent;
  let fixture: ComponentFixture<ProjektReszletekComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjektReszletekComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjektReszletekComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
