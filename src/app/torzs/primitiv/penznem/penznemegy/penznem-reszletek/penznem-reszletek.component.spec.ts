import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PenznemReszletekComponent } from './penznem-reszletek.component';

describe('PenznemReszletekComponent', () => {
  let component: PenznemReszletekComponent;
  let fixture: ComponentFixture<PenznemReszletekComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PenznemReszletekComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PenznemReszletekComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
