import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PenztaregyComponent } from './penztaregy.component';

describe('PenztaregyComponent', () => {
  let component: PenztaregyComponent;
  let fixture: ComponentFixture<PenztaregyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PenztaregyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PenztaregyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
