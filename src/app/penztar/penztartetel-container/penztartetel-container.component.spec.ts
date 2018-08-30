import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PenztartetelContainerComponent } from './penztartetel-container.component';

describe('PenztartetelContainerComponent', () => {
  let component: PenztartetelContainerComponent;
  let fixture: ComponentFixture<PenztartetelContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PenztartetelContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PenztartetelContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
