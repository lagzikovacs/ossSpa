import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjektTeendoListComponent } from './projekt-teendo-list.component';

describe('ProjektTeendoListComponent', () => {
  let component: ProjektTeendoListComponent;
  let fixture: ComponentFixture<ProjektTeendoListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjektTeendoListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjektTeendoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
