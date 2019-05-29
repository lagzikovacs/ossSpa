import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjektTeendoContainerComponent } from './projekt-teendo-container.component';

describe('ProjektTeendoContainerComponent', () => {
  let component: ProjektTeendoContainerComponent;
  let fixture: ComponentFixture<ProjektTeendoContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjektTeendoContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjektTeendoContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
