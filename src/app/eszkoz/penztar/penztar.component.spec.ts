import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PenztarComponent } from './penztar.component';

describe('PenztarComponent', () => {
  let component: PenztarComponent;
  let fixture: ComponentFixture<PenztarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PenztarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PenztarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
