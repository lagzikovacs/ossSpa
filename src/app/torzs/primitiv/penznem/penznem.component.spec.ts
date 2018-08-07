import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PenznemComponent } from './penznem.component';

describe('PenznemComponent', () => {
  let component: PenznemComponent;
  let fixture: ComponentFixture<PenznemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PenznemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PenznemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
