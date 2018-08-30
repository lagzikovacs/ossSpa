import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjektTeendoElvegezveComponent } from './projekt-teendo-elvegezve.component';

describe('ProjektTeendoElvegezveComponent', () => {
  let component: ProjektTeendoElvegezveComponent;
  let fixture: ComponentFixture<ProjektTeendoElvegezveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjektTeendoElvegezveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjektTeendoElvegezveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
