import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PenznemContainerComponent } from './penznem-container.component';

describe('PenznemContainerComponent', () => {
  let component: PenznemContainerComponent;
  let fixture: ComponentFixture<PenznemContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PenznemContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PenznemContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
