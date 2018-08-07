import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PenznemegyComponent } from './penznemegy.component';

describe('PenznemegyComponent', () => {
  let component: PenznemegyComponent;
  let fixture: ComponentFixture<PenznemegyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PenznemegyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PenznemegyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
