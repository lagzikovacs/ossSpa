import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PenztartetelComponent } from './penztartetel.component';

describe('PenztartetelComponent', () => {
  let component: PenztartetelComponent;
  let fixture: ComponentFixture<PenztartetelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PenztartetelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PenztartetelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
