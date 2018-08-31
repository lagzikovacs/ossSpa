import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjektTeendoTorlesComponent } from './projekt-teendo-torles.component';

describe('ProjektTeendoTorlesComponent', () => {
  let component: ProjektTeendoTorlesComponent;
  let fixture: ComponentFixture<ProjektTeendoTorlesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjektTeendoTorlesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjektTeendoTorlesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
