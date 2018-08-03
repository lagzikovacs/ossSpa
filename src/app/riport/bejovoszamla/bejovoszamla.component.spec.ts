import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BejovoszamlaComponent } from './bejovoszamla.component';

describe('BejovoszamlaComponent', () => {
  let component: BejovoszamlaComponent;
  let fixture: ComponentFixture<BejovoszamlaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BejovoszamlaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BejovoszamlaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
