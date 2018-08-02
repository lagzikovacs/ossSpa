import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HelysegComponent } from './helyseg.component';

describe('HelysegComponent', () => {
  let component: HelysegComponent;
  let fixture: ComponentFixture<HelysegComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HelysegComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HelysegComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
