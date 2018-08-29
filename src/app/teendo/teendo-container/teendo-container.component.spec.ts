import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeendoContainerComponent } from './teendo-container.component';

describe('TeendoContainerComponent', () => {
  let component: TeendoContainerComponent;
  let fixture: ComponentFixture<TeendoContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeendoContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeendoContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
