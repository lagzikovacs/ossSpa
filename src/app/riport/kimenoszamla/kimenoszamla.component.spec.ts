import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KimenoszamlaComponent } from './kimenoszamla.component';

describe('KimenoszamlaComponent', () => {
  let component: KimenoszamlaComponent;
  let fixture: ComponentFixture<KimenoszamlaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KimenoszamlaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KimenoszamlaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
