import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjektTeendoegyComponent } from './projekt-teendoegy.component';

describe('ProjektTeendoegyComponent', () => {
  let component: ProjektTeendoegyComponent;
  let fixture: ComponentFixture<ProjektTeendoegyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjektTeendoegyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjektTeendoegyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
