import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjektTeendoEgyComponent } from './projekt-teendo-egy.component';

describe('ProjektTeendoEgyComponent', () => {
  let component: ProjektTeendoEgyComponent;
  let fixture: ComponentFixture<ProjektTeendoEgyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjektTeendoEgyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjektTeendoEgyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
